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
const typeorm_2 = require("typeorm");
const uuid_1 = require("uuid");
let StudentService = class StudentService {
    constructor(studentRepository, studentOtpRepository, notificationRepository, mailer) {
        this.studentRepository = studentRepository;
        this.studentOtpRepository = studentOtpRepository;
        this.notificationRepository = notificationRepository;
        this.mailer = mailer;
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
        await this.mailer.sendVerificationMail(dto.email, emailCode, dto.username);
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
        const otp = await this.studentOtpRepository.findOne({ where: { otp: dto.email, expirationTime: (0, typeorm_2.LessThan)(new Date()) } });
        if (!otp) {
            throw new common_1.HttpException('Previous Otp has not expired', common_1.HttpStatus.BAD_REQUEST);
        }
        ;
        const otpCode = await this.verificationCode();
        const otpTime = new Date();
        await otpTime.setMinutes(otpTime.getMinutes() + 10);
        const newOtp = new otp_entity_1.StudentOtpEntity();
        newOtp.email = dto.email;
        newOtp.expirationTime = otpTime;
        newOtp.otp = otpCode;
        await this.studentOtpRepository.save(newOtp);
        const notification = new notification_entity_1.NotificationEntity();
        notification.account = dto.email;
        notification.subject = 'New otp sent to student';
        notification.message = ``;
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
            throw new common_1.HttpException('This email has not been registered', common_1.HttpStatus.NOT_FOUND);
        }
        const compare = await this.comparePassword(dto.password, student.password);
        if (!compare) {
            throw new common_1.HttpException('Invalid credentials', common_1.HttpStatus.UNAUTHORIZED);
        }
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
        mailer_service_1.Mailer])
], StudentService);
//# sourceMappingURL=student.service.js.map