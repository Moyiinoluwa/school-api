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
exports.StudentController = void 0;
const common_1 = require("@nestjs/common");
const student_service_1 = require("./student.service");
const student_dto_1 = require("./student.dto");
const common_dto_1 = require("../common/common.dto");
let StudentController = class StudentController {
    constructor(studentService) {
        this.studentService = studentService;
    }
    async CreateStudent(dto) {
        return await this.studentService.createStudent(dto);
    }
    async login(dto) {
        return await this.studentService.login(dto);
    }
    async VerifyOtpDto(dto) {
        return await this.studentService.verifyOtp(dto);
    }
    async ResendOtp(dto) {
        return await this.studentService.ResendOtp(dto);
    }
    async ResetPasswordLink(dto) {
        return await this.studentService.ResetPasswordLink(dto);
    }
    async ResetPassword(dto) {
        return await this.studentService.ResetPassword(dto);
    }
    async updateProfile(dto, id) {
        return await this.studentService.updateProfile(dto, id);
    }
    async changePassword(id, dto) {
        return await this.studentService.changePassword(id, dto);
    }
    async allStudent() {
        return await this.studentService.getAll();
    }
    async oneStudent(id) {
        return await this.studentService.getOneStudent(id);
    }
};
exports.StudentController = StudentController;
__decorate([
    (0, common_1.Post)('/register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [student_dto_1.CreateStudentDto]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "CreateStudent", null);
__decorate([
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('/verify-otp'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_dto_1.VerifyOtpDto]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "VerifyOtpDto", null);
__decorate([
    (0, common_1.Post)('/resend-otp'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_dto_1.ResendOtpDto]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "ResendOtp", null);
__decorate([
    (0, common_1.Post)('/reset-password-link'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_dto_1.ResetPasswordLinkDto]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "ResetPasswordLink", null);
__decorate([
    (0, common_1.Post)('/reset-password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_dto_1.ResetPassword]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "ResetPassword", null);
__decorate([
    (0, common_1.Put)('/update/:id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [student_dto_1.UpdateStudentDto, Number]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Put)('/change/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, common_dto_1.ChangePasswordDto]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "changePassword", null);
__decorate([
    (0, common_1.Get)('/get'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "allStudent", null);
__decorate([
    (0, common_1.Get)('/get/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "oneStudent", null);
exports.StudentController = StudentController = __decorate([
    (0, common_1.Controller)('student'),
    __metadata("design:paramtypes", [student_service_1.StudentService])
], StudentController);
//# sourceMappingURL=student.controller.js.map