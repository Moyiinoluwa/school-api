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
exports.TeacherController = void 0;
const common_1 = require("@nestjs/common");
const teacher_dto_1 = require("./teacher.dto");
const teacher_service_1 = require("./teacher.service");
const common_dto_1 = require("../common/common.dto");
let TeacherController = class TeacherController {
    constructor(teacherService) {
        this.teacherService = teacherService;
    }
    async register(dto) {
        return await this.teacherService.createTeacher(dto);
    }
    async verifyCode(dto) {
        return await this.teacherService.verifyCode(dto);
    }
    async resendCode(dto) {
        return await this.teacherService.resendCode(dto);
    }
    async resetPasswordLink(dto) {
        return await this.teacherService.resetTeacherPasswordLink(dto);
    }
    async resetPassword(dto) {
        return await this.teacherService.resetTeacherPassword(dto);
    }
    async updateTeacher(id, dto) {
        return await this.teacherService.updateTeacher(id, dto);
    }
    async login(dto) {
        return await this.teacherService.loginTeacher(dto);
    }
    async changePassword(id, dto) {
        return await this.teacherService.changeTeacherPassword(id, dto);
    }
    async getAll() {
        return await this.teacherService.getTeachers();
    }
    async getOne(id) {
        return await this.teacherService.getTeacher(id);
    }
    async deleteTeacher(id) {
        return await this.teacherService.deleteTeacher(id);
    }
};
exports.TeacherController = TeacherController;
__decorate([
    (0, common_1.Post)('/register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [teacher_dto_1.CreateTeacherDto]),
    __metadata("design:returntype", Promise)
], TeacherController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('/verify-otp'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_dto_1.verifyTeacherOtpDto]),
    __metadata("design:returntype", Promise)
], TeacherController.prototype, "verifyCode", null);
__decorate([
    (0, common_1.Post)('/resend-otp'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_dto_1.resendTeacherOtpDto]),
    __metadata("design:returntype", Promise)
], TeacherController.prototype, "resendCode", null);
__decorate([
    (0, common_1.Post)('/reset-password-link'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_dto_1.ResetDto]),
    __metadata("design:returntype", Promise)
], TeacherController.prototype, "resetPasswordLink", null);
__decorate([
    (0, common_1.Post)('/reset-password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_dto_1.resetTeacherPasswordDto]),
    __metadata("design:returntype", Promise)
], TeacherController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.Put)('/update/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, teacher_dto_1.UpdateTeacherDto]),
    __metadata("design:returntype", Promise)
], TeacherController.prototype, "updateTeacher", null);
__decorate([
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], TeacherController.prototype, "login", null);
__decorate([
    (0, common_1.Patch)('/change/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, common_dto_1.ChangeApassword]),
    __metadata("design:returntype", Promise)
], TeacherController.prototype, "changePassword", null);
__decorate([
    (0, common_1.Get)('/all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TeacherController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('/get/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TeacherController.prototype, "getOne", null);
__decorate([
    (0, common_1.Delete)('/delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TeacherController.prototype, "deleteTeacher", null);
exports.TeacherController = TeacherController = __decorate([
    (0, common_1.Controller)('teacher'),
    __metadata("design:paramtypes", [teacher_service_1.TeacherService])
], TeacherController);
//# sourceMappingURL=teacher.controller.js.map