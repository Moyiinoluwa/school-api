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
exports.TeacherService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const bcrypt = require("bcrypt");
const teacher_repository_1 = require("./teacher.repository");
const teacher_entity_1 = require("../Entity/teacher.entity");
const nanoid_1 = require("nanoid");
const common_repository_1 = require("../common/common.repository");
const mailer_service_1 = require("../Mailer/mailer.service");
const teacherOtp_entity_1 = require("../Entity/teacherOtp.entity");
const typeorm_2 = require("typeorm");
const uuid_1 = require("uuid");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
let TeacherService = class TeacherService {
    constructor(teacherRepository, teacherOtpRepository, mailer, jwt, configService) {
        this.teacherRepository = teacherRepository;
        this.teacherOtpRepository = teacherOtpRepository;
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
    async createCode() {
        const generateCode = (0, nanoid_1.customAlphabet)('0123456789', 6);
        return generateCode();
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
        return { accessToken: token };
    }
    async createTeacher(dto) {
        const teacher = await this.teacherRepository.findOne({ where: { email: dto.email } });
        if (teacher) {
            throw new common_1.HttpException('teacher is registered', common_1.HttpStatus.FOUND);
        }
        const hash = await this.hashPassword(dto.password);
        const newTeacher = new teacher_entity_1.TeacherEntity();
        newTeacher.email = dto.email;
        newTeacher.fullname = dto.fullname;
        newTeacher.username = dto.username;
        newTeacher.qualification = dto.qualification;
        newTeacher.createdAt = new Date();
        newTeacher.password = hash;
        await this.teacherRepository.save(newTeacher);
        const otpCode = await this.createCode();
        const codeTime = new Date();
        codeTime.setMinutes(codeTime.getMinutes() + 10);
        const teacherOtp = new teacherOtp_entity_1.TeacherOtpEntity();
        teacherOtp.email = dto.email;
        teacherOtp.otp = otpCode;
        teacherOtp.expirationTime = codeTime;
        teacherOtp.createdAt = new Date();
        await this.teacherOtpRepository.save(teacherOtp);
        await this.mailer.sendVerificationMail(dto.email, otpCode, dto.username);
        return { message: 'teacher registered' };
    }
    async verifyCode(dto) {
        const code = await this.teacherOtpRepository.findOne({ where: { email: dto.email } });
        if (!code) {
            throw new common_1.HttpException('This email is not registered', common_1.HttpStatus.NOT_FOUND);
        }
        const teachOtp = await this.teacherOtpRepository.findOne({ where: { otp: dto.otp } });
        if (!teachOtp) {
            throw new common_1.HttpException('the otp you entered is not correct', common_1.HttpStatus.FORBIDDEN);
        }
        if (teachOtp.expirationTime <= new Date()) {
            throw new common_1.HttpException('the otp has expired, please request for a new one', common_1.HttpStatus.BAD_REQUEST);
        }
        const teacher = await this.teacherRepository.findOne({ where: { email: dto.email } });
        if (teacher.email !== code.email) {
            throw new common_1.HttpException('the teacher is not registered', common_1.HttpStatus.NOT_FOUND);
        }
        teacher.isVerified = true;
        teacher.isRegistered = true;
        teacher.isLoggedIn = true;
        teachOtp.verified = true;
        await this.teacherRepository.save(teacher);
        return { message: 'Otp verified' };
    }
    async resendCode(dto) {
        const teacher = await this.teacherRepository.findOne({ where: { email: dto.email } });
        if (!teacher) {
            throw new common_1.HttpException('Teacher cannot request for new code', common_1.HttpStatus.NOT_FOUND);
        }
        ;
        const code = await this.teacherOtpRepository.findOne({ where: { otp: dto.email, expirationTime: (0, typeorm_2.LessThan)(new Date()) } });
        if (code) {
            throw new common_1.HttpException('the previous code has not expired', common_1.HttpStatus.BAD_REQUEST);
        }
        const newTeacherCode = await this.createCode();
        const codeWatch = new Date();
        codeWatch.setMinutes(codeWatch.getMinutes() + 10);
        const codeAgain = new teacherOtp_entity_1.TeacherOtpEntity();
        codeAgain.email = dto.email;
        codeAgain.expirationTime = codeWatch;
        codeAgain.otp = newTeacherCode;
        codeAgain.createdAt = new Date();
        await this.teacherOtpRepository.save(codeAgain);
        await this.mailer.sendVerificationMail(dto.email, newTeacherCode, teacher.username);
        return { message: 'A new code has been sent' };
    }
    async resetTeacherPasswordLink(dto) {
        const teacher = await this.teacherRepository.findOne({ where: { email: dto.email } });
        if (!teacher) {
            throw new common_1.HttpException('teacher cannot receive link', common_1.HttpStatus.NOT_FOUND);
        }
        const linkToken = (0, uuid_1.v4)();
        const link = `http://localhost:5000/teacher/reset-password?=${linkToken}`;
        const linkTime = new Date();
        linkTime.setMinutes(linkTime.getMinutes() + 10);
        teacher.resetLink = link;
        teacher.isResetLinkSent = true;
        await this.teacherRepository.save(teacher);
        await this.mailer.resetPasswordMail(dto.email, link, teacher.username);
        return { message: 'reset link sent' };
    }
    async resetTeacherPassword(dto) {
        const teacher = await this.teacherRepository.findOne({ where: { email: dto.email } });
        if (!teacher) {
            throw new common_1.HttpException('Teacher cannot reset password', common_1.HttpStatus.NOT_FOUND);
        }
        if (teacher.resetLink !== dto.resetLink) {
            throw new common_1.HttpException('invalid reset link', common_1.HttpStatus.FORBIDDEN);
        }
        const hash = await this.hashPassword(dto.password);
        teacher.password = hash;
        return { message: 'password reset successfully' };
    }
    async loginTeacher(dto) {
        const teacher = await this.teacherRepository.findOne({ where: { email: dto.email } });
        if (!teacher) {
            throw new common_1.BadRequestException('teacher is not registered');
        }
        const access = await this.comparePassword(dto.password, teacher.password);
        if (!access) {
            teacher.loginCount = +1;
        }
        if (teacher.loginCount >= 5) {
            teacher.isLocked = true;
            teacher.locked_until = new Date(Date.now() + 2 * 60 * 60 * 1000);
            throw new common_1.BadRequestException('Invalid password, account locked for two hours');
        }
        teacher.loginCount = 0;
        teacher.isLoggedIn = true;
        await this.teacherRepository.save(teacher);
        return await this.signToken(teacher.id, teacher.email, teacher.role);
    }
    async updateTeacher(id, dto) {
        const teacher = await this.teacherRepository.findOne({ where: { id } });
        if (!teacher) {
            throw new common_1.BadRequestException('Teacher cannot update account');
        }
        teacher.email = dto.email;
        teacher.fullname = dto.fullname;
        teacher.qualification = dto.qualification;
        teacher.username = dto.username;
        await this.teacherRepository.save(teacher);
        return { message: 'teacher profile updated' };
    }
    async changeTeacherPassword(id, dto) {
        const teacher = await this.teacherRepository.findOne({ where: { id } });
        if (!teacher) {
            throw new common_1.BadRequestException('Teacher cannot change password');
        }
        const validPassword = await this.comparePassword(dto.oldPassword, teacher.password);
        if (!validPassword) {
            throw new common_1.BadRequestException('The password you entered is incorrect');
        }
        const hash = await this.hashPassword(dto.newPassword);
        teacher.password = hash;
        await this.teacherRepository.save(teacher);
        return { message: 'Password changed!' };
    }
    async getTeachers() {
        const teacher = await this.teacherRepository.find();
        return teacher;
    }
    async getTeacher(id) {
        const teacher = await this.teacherRepository.findOne({ where: { id } });
        if (!teacher) {
            throw new common_1.BadRequestException('Cannot find teacher');
        }
        else {
            return teacher;
        }
    }
    async deleteTeacher(id) {
        const teacher = await this.teacherRepository.findOne({ where: { id } });
        if (!teacher) {
            throw new common_1.BadRequestException('cannot delete teacher');
        }
        await this.teacherRepository.remove(teacher);
        return { message: 'teacher deleted' };
    }
};
exports.TeacherService = TeacherService;
exports.TeacherService = TeacherService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(teacher_repository_1.TeacherRepository)),
    __param(1, (0, typeorm_1.InjectRepository)(common_repository_1.TeacherOtpRepository)),
    __metadata("design:paramtypes", [teacher_repository_1.TeacherRepository,
        common_repository_1.TeacherOtpRepository,
        mailer_service_1.Mailer,
        jwt_1.JwtService,
        config_1.ConfigService])
], TeacherService);
//# sourceMappingURL=teacher.service.js.map