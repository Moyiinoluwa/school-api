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
let TeacherService = class TeacherService {
    constructor(teacherRepository, teacherOtpRepository, mailer) {
        this.teacherRepository = teacherRepository;
        this.teacherOtpRepository = teacherOtpRepository;
        this.mailer = mailer;
    }
    async hashPassword(password) {
        return await bcrypt.hash(password, 12);
    }
    async createCode() {
        const generateCode = (0, nanoid_1.customAlphabet)('0123456789', 6);
        return generateCode();
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
        await this.mailer.sendVerificationMail(dto.email, otpCode, dto.username);
        const codeTime = new Date();
        await codeTime.setMinutes(codeTime.getMinutes() + 10);
        const teacherOtp = new teacherOtp_entity_1.TeacherOtpEntity();
        teacherOtp.email = dto.email;
        teacherOtp.otp = otpCode;
        teacherOtp.expirationTime = codeTime;
        teacherOtp.createdAt = new Date();
        await this.teacherOtpRepository.save(teacherOtp);
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
        else {
            teacher.isVerified = true;
            teacher.isRegistered = true;
        }
        return { isValid: true };
    }
    async resendCode(dto) {
        const teacher = await this.teacherRepository.findOne({ where: { email: dto.email } });
        if (!teacher) {
            throw new common_1.HttpException('Teacher cannot request for new code', common_1.HttpStatus.NOT_FOUND);
        }
        ;
        const code = await this.teacherOtpRepository.findOne({ where: { otp: dto.email, expirationTime: (0, typeorm_2.LessThan)(new Date()) } });
        if (!code) {
            throw new common_1.HttpException('the previous code has not expired', common_1.HttpStatus.BAD_REQUEST);
        }
        const newTeacherCode = await this.createCode();
        const codeWatch = new Date();
        await codeWatch.setMinutes(codeWatch.getMinutes() + 10);
        const codeAgain = new teacherOtp_entity_1.TeacherOtpEntity();
        codeAgain.email = dto.email;
        codeAgain.expirationTime = codeWatch;
        codeAgain.otp = newTeacherCode;
        codeAgain.createdAt = new Date();
        await this.teacherOtpRepository.save(codeAgain);
        await this.mailer.sendVerificationMail(dto.email, newTeacherCode, teacher.username);
        return { message: 'A new code has been sent' };
    }
};
exports.TeacherService = TeacherService;
exports.TeacherService = TeacherService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(teacher_repository_1.TeacherRepository)),
    __param(1, (0, typeorm_1.InjectRepository)(common_repository_1.TeacherOtpRepository)),
    __metadata("design:paramtypes", [teacher_repository_1.TeacherRepository,
        common_repository_1.TeacherOtpRepository,
        mailer_service_1.Mailer])
], TeacherService);
//# sourceMappingURL=teacher.service.js.map