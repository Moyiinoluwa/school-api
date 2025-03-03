"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const student_repository_1 = require("./student.repository");
const bcrypt = require("bcrypt");
const student_entity_1 = require("../Entity/student.entity");
const nanoid_1 = require("nanoid");
const otp_entity_1 = require("../Entity/otp.entity");
const common_repository_1 = require("../common/common.repository");
const mailer_service_1 = require("../Mailer/mailer.service");
const notification_entity_1 = require("../Entity/notification.entity");
const uuid_1 = require("uuid");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
let StudentService = class StudentService {
    constructor(studentRepository, studentOtpRepository, notificationRepository, mailer, jwt, configService) {
        this.studentRepository = studentRepository;
        this.studentOtpRepository = studentOtpRepository;
        this.notificationRepository = notificationRepository;
        this.mailer = mailer;
        this.jwt = jwt;
        this.configService = configService;
    }
    async hashPassword(password) {
        return await bcrypt.hash(password, 12);
    }
    async comparePassword(password, userpassword) {
        return await bcrypt.compare(password, userpassword);
    }
    async verificationCode() {
        const generate = (0, nanoid_1.customAlphabet)('1234567890', 6);
        return generate();
    }
    async signToken(id, email, role) {
        const payload = {
            sub: id,
            email,
            role
        };
        const secret = this.configService.get('SECRET_KEY');
        const token = await this.jwt.signAsync(payload, {
            expiresIn: this.configService.get('EXPIRESIN'),
            secret: secret
        });
        return { accesstoken: token };
    }
    async createStudent(dto) {
        const studentRegister = await this.studentRepository.findOne({ where: { email: dto.email } });
        if (studentRegister) {
            throw new common_1.HttpException('this student already exist', common_1.HttpStatus.FOUND);
        }
        const hash = await this.hashPassword(dto.password);
        const student = new student_entity_1.StudentEntity();
        student.username = dto.username;
        student.surname = dto.surname;
        student.name = dto.name;
        student.email = dto.email;
        student.createdAt = new Date();
        student.password = hash;
        await this.studentRepository.save(student);
        const emailCode = await this.verificationCode();
        const otpExpiration = new Date();
        await otpExpiration.setMinutes(otpExpiration.getMinutes() + 10);
        const otp = new otp_entity_1.StudentOtpEntity();
        otp.email = dto.email;
        otp.otp = emailCode;
        otp.expirationTime = otpExpiration;
        await this.studentOtpRepository.save(otp);
        const notification = new notification_entity_1.NotificationEntity();
        notification.account = student.name;
        notification.subject = 'New Student Created';
        notification.message = `new student registered successfully`;
        await this.notificationRepository.save(notification);
        await this.mailer.sendVerificationMail(dto.email, emailCode, dto.username);
        return { message: 'student registered' };
    }
    async verifyOtp(dto) {
        const otpEmail = await this.studentOtpRepository.findOne({ where: { email: dto.email } });
        if (!otpEmail) {
            throw new common_1.HttpException('this was not the email the otp was sent to', common_1.HttpStatus.NOT_FOUND);
        }
        const otp = await this.studentOtpRepository.findOne({ where: { otp: dto.otp } });
        if (!otp) {
            throw new common_1.HttpException('the otp is not correct', common_1.HttpStatus.NOT_FOUND);
        }
        if (otp.expirationTime <= new Date()) {
            throw new common_1.HttpException('otp has expired, please request for another one', common_1.HttpStatus.BAD_REQUEST);
        }
        const student = await this.studentRepository.findOne({ where: { email: dto.email } });
        if (student.email !== otpEmail.email) {
            throw new common_1.HttpException('the student is not registered', common_1.HttpStatus.NOT_FOUND);
        }
        else {
            student.isLoggedIn = true;
            student.isRegistered = true;
            student.isVerified = true;
            const notification = new notification_entity_1.NotificationEntity();
            notification.account = student.name;
            notification.subject = 'Student Otp verified';
            notification.message = `hello ${student.name}, your otp has been verified`;
            await this.notificationRepository.save(notification);
            await this.studentRepository.save(student);
        }
        return { isValid: true };
    }
    async ResendOtp(dto) {
        const student = await this.studentRepository.findOne({ where: { email: dto.email } });
        if (!student) {
            throw new common_1.HttpException(`Student with ${dto.email} does not exists, plesea check the email you entered`, common_1.HttpStatus.NOT_FOUND);
        }
        ;
        const otpCode = await this.verificationCode();
        const otpTime = new Date();
        otpTime.setMinutes(otpTime.getMinutes() + 10);
        const newOtp = new otp_entity_1.StudentOtpEntity();
        newOtp.email = dto.email;
        newOtp.expirationTime = otpTime;
        newOtp.otp = otpCode;
        await this.studentOtpRepository.save(newOtp);
        await this.mailer.sendVerificationMail(newOtp.email, otpCode, student.name);
        return { message: 'new otp sent' };
    }
    async ResetPasswordLink(dto) {
        const student = await this.studentRepository.findOne({ where: { email: dto.email } });
        if (!student) {
            throw new common_1.HttpException('this email is not registered on the server', common_1.HttpStatus.NOT_FOUND);
        }
        const resetToken = (0, uuid_1.v4)();
        const tokenTime = new Date();
        tokenTime.setMinutes(tokenTime.getMinutes() + 10);
        const resetLink = `http://localhost:5000/student/reset-password?token=${resetToken}`;
        student.isResetLink = resetLink;
        student.isresetPasswordLinkSent = true;
        student.resetPasswordLinkExpirationTime = tokenTime;
        await this.studentRepository.save(student);
        await this.mailer.resetPasswordMail(dto.email, resetLink, student.name);
        return { message: 'reset password link sent' };
    }
    async ResetPassword(dto) {
        const student = await this.studentRepository.findOne({ where: { email: dto.email } });
        if (!student) {
            throw new common_1.HttpException('this student cannot reset password', common_1.HttpStatus.NOT_FOUND);
        }
        if (student.isResetLink !== dto.resetLink) {
            throw new common_1.HttpException('Invalid reset link', common_1.HttpStatus.FORBIDDEN);
        }
        const newPassword = await this.hashPassword(dto.password);
        student.password = newPassword;
        const notification = new notification_entity_1.NotificationEntity();
        notification.account = student.name;
        notification.subject = 'New Password set';
        notification.message = `Hello ${student.name}, your new password has been set`;
        await this.notificationRepository.save(notification);
        return { message: 'Password Reset successfully' };
    }
    async login(dto) {
        const student = await this.studentRepository.findOne({ where: { email: dto.email } });
        if (!student) {
            throw new common_1.HttpException('Invalid email or password', common_1.HttpStatus.UNAUTHORIZED);
        }
        const compare = await this.comparePassword(dto.password, student.password);
        if (!compare) {
            student.loginCount += 1;
        }
        if (student.loginCount >= 5) {
            student.isLocked = true;
            student.locked_until = new Date(Date.now() + 2 * 60 * 60 * 1000);
            await this.studentRepository.save(student);
            throw new common_1.HttpException('Invalid password', common_1.HttpStatus.UNAUTHORIZED);
        }
        if (!student.isVerified) {
            throw new common_1.HttpException('Account is not verified, please request for a verification code', common_1.HttpStatus.UNAUTHORIZED);
        }
        student.loginCount = 0;
        student.isLoggedIn = true;
        await this.studentRepository.save(student);
        return await this.signToken(student.id, student.email, student.role);
    }
    async changePassword(id, dto) {
        const student = await this.studentRepository.findOne({ where: { id } });
        if (!student) {
            throw new common_1.BadRequestException('Student cannot change password');
        }
        const isPasswordValid = await this.comparePassword(dto.oldPassword, student.password);
        if (!isPasswordValid) {
            throw new common_1.BadRequestException('Current password is incorrect');
        }
        const hashedNewPassword = await this.hashPassword(dto.newPassword);
        student.password = hashedNewPassword;
        await this.studentRepository.save(student);
        return { message: 'Password changed successfully' };
    }
    async updateProfile(dto, id) {
        const student = await this.studentRepository.findOne({ where: { id } });
        if (!student) {
            throw new common_1.HttpException('student cannot update profile', common_1.HttpStatus.NOT_FOUND);
        }
        student.email = dto.email;
        student.name = dto.name;
        student.surname = dto.surname;
        student.username = dto.username;
        await this.studentRepository.save(student);
        return { message: 'Profile updated' };
    }
    async getAll() {
        const student = await this.studentRepository.find();
        return student;
    }
    async getOneStudent(id) {
        const student = await this.studentRepository.findOne({ where: { id } });
        if (!student) {
            throw new common_1.BadRequestException('student not found');
        }
        else {
            return student;
        }
    }
    async deleteStudent(id) {
        const student = await this.studentRepository.findOne({ where: { id } });
        if (!student) {
            throw new common_1.BadRequestException('cannot delete student');
        }
        await this.studentRepository.remove(student);
        return { message: 'student deleted' };
    }
};
exports.StudentService = StudentService;
exports.StudentService = StudentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(student_repository_1.StudentRepository)),
    __param(1, (0, typeorm_1.InjectRepository)(common_repository_1.StudentOtpRepository)),
    __param(2, (0, typeorm_1.InjectRepository)(common_repository_1.NotificationRepository)),
    __metadata("design:paramtypes", [student_repository_1.StudentRepository,
        common_repository_1.StudentOtpRepository,
        common_repository_1.NotificationRepository,
        mailer_service_1.Mailer,
        jwt_1.JwtService,
        config_1.ConfigService])
], StudentService);
//# sourceMappingURL=student.service.js.map