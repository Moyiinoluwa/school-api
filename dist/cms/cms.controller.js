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
exports.CmsController = void 0;
const common_1 = require("@nestjs/common");
const cms_service_1 = require("./cms.service");
const platform_express_1 = require("@nestjs/platform-express");
const cms_dto_1 = require("./cms.dto");
let CmsController = class CmsController {
    constructor(cmsService) {
        this.cmsService = cmsService;
    }
    async uploadProfilePicture(id, file) {
        return await this.cmsService.uploadProfilePicture(id, file);
    }
    async viewStudentScore(id, subject) {
        return await this.cmsService.viewStudentScore(id, subject);
    }
    async sendTeacherMessage(sender_id, reciever_id, message) {
        return await this.cmsService.messageTeacher(sender_id, reciever_id, message);
    }
    async sendStudentMessage(sender_id, reciever_id, message) {
        return await this.cmsService.studentToStudent(sender_id, reciever_id, message);
    }
    async uploadAnswer(id, file) {
        return await this.cmsService.uploadAnswer(id, file);
    }
    async uploadTeacherPicture(id, file) {
        return await this.cmsService.uploadTeacherPicture(id, file);
    }
    async sendAssignment(teacher_id, student_id, file) {
        return await this.cmsService.uploadAssignment(teacher_id, student_id, file);
    }
    async setScore(teacher_id, student_id, assign_id, dto) {
        return await this.cmsService.studentScore(teacher_id, student_id, assign_id, dto);
    }
    async editScore(studentId, teacherId, assignmentId, dto) {
        return await this.cmsService.editScore(studentId, teacherId, assignmentId, dto);
    }
    async messageStudent(teacherId, studentId, message) {
        return await this.cmsService.messageStudent(teacherId, studentId, message);
    }
    async teacher(teacherId, teaacherId, message) {
        return await this.cmsService.teacherToTeacher(teacherId, teaacherId, message);
    }
};
exports.CmsController = CmsController;
__decorate([
    (0, common_1.Post)('/profile-picture/:id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "uploadProfilePicture", null);
__decorate([
    (0, common_1.Get)('/view-score/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('subject')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "viewStudentScore", null);
__decorate([
    (0, common_1.Post)('/message/:sender_id/:reciever_id'),
    __param(0, (0, common_1.Param)('sender_id')),
    __param(1, (0, common_1.Param)('reciever_id')),
    __param(2, (0, common_1.Body)('message')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "sendTeacherMessage", null);
__decorate([
    (0, common_1.Post)('/message-student/:sender_id/:reciever_id'),
    __param(0, (0, common_1.Param)('sender_id')),
    __param(1, (0, common_1.Param)('reciever_id')),
    __param(2, (0, common_1.Body)('message')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "sendStudentMessage", null);
__decorate([
    (0, common_1.Post)('/upload-answer/:id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "uploadAnswer", null);
__decorate([
    (0, common_1.Patch)('/upload-pic/:id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "uploadTeacherPicture", null);
__decorate([
    (0, common_1.Post)('/send-assignment/:teacher_id/:student_id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Param)('teacher_id')),
    __param(1, (0, common_1.Param)('student_id')),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "sendAssignment", null);
__decorate([
    (0, common_1.Post)('/set/:teacher_id/:student-id'),
    __param(0, (0, common_1.Param)('teacher_id')),
    __param(1, (0, common_1.Param)('student_id')),
    __param(2, (0, common_1.Param)('assign_id')),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number, cms_dto_1.StudentScoreDto]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "setScore", null);
__decorate([
    (0, common_1.Patch)('/edit/:studentId/:teacherid/:assignmentId'),
    __param(0, (0, common_1.Param)('studentId')),
    __param(1, (0, common_1.Param)('teacherId')),
    __param(2, (0, common_1.Param)('assignmentId')),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number, cms_dto_1.StudentScoreDto]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "editScore", null);
__decorate([
    (0, common_1.Post)('/send/:teacherId/:stuentId'),
    __param(0, (0, common_1.Param)('teacherId')),
    __param(1, (0, common_1.Param)('studentId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "messageStudent", null);
__decorate([
    (0, common_1.Post)('/send-teacher/:teacherid/:teacherId'),
    __param(0, (0, common_1.Param)('teacherId')),
    __param(1, (0, common_1.Param)('teaacherId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "teacher", null);
exports.CmsController = CmsController = __decorate([
    (0, common_1.Controller)('cms'),
    __metadata("design:paramtypes", [cms_service_1.CmsService])
], CmsController);
//# sourceMappingURL=cms.controller.js.map