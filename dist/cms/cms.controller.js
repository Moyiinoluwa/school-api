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
const upload_service_1 = require("../Helpers/upload.service");
const platform_express_1 = require("@nestjs/platform-express");
let CmsController = class CmsController {
    constructor(cmsService, uploadService) {
        this.cmsService = cmsService;
        this.uploadService = uploadService;
    }
    async uploadProfilePicture(id, file) {
        const filename = await this.uploadService.uploadFile(file);
        await this.cmsService.uploadProfilePicture(id, filename);
        return { message: 'profile picture uploaded' };
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
};
exports.CmsController = CmsController;
__decorate([
    (0, common_1.Post)('/profile-picture/:id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "uploadProfilePicture", null);
__decorate([
    (0, common_1.Get)('/view-score/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('subject')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "viewStudentScore", null);
__decorate([
    (0, common_1.Post)('/message/:sender_id/:reciever_id'),
    __param(0, (0, common_1.Param)('sender_id')),
    __param(1, (0, common_1.Param)('reciever_id')),
    __param(2, (0, common_1.Body)('message')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "sendTeacherMessage", null);
__decorate([
    (0, common_1.Post)('/message-student/:sender_id/:reciever_id'),
    __param(0, (0, common_1.Param)('sender_id')),
    __param(1, (0, common_1.Param)('reciever_id')),
    __param(2, (0, common_1.Body)('message')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "sendStudentMessage", null);
exports.CmsController = CmsController = __decorate([
    (0, common_1.Controller)('cms'),
    __metadata("design:paramtypes", [cms_service_1.CmsService,
        upload_service_1.UploadService])
], CmsController);
//# sourceMappingURL=cms.controller.js.map