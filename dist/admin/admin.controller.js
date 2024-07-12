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
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const admin_service_1 = require("./admin.service");
const admin_dto_1 = require("./admin.dto");
const common_dto_1 = require("../common/common.dto");
let AdminController = class AdminController {
    constructor(adminService) {
        this.adminService = adminService;
    }
    async registerAdmin(dto) {
        return await this.adminService.registerAdmin(dto);
    }
    async verifyAdminotp(dto) {
        return this.adminService.verifyAdminOtp(dto);
    }
    async resendAdminOtp(dto) {
        return this.adminService.resendAdminOtp(dto);
    }
    async resetAdminPasswordLink(dto) {
        return this.adminService.resetAdminPasswordLink(dto);
    }
    async resetAdminPassword(dto) {
        return this.adminService.resetAdminPassword(dto);
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, common_1.Post)('/register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_dto_1.CreateAdminDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "registerAdmin", null);
__decorate([
    (0, common_1.Post)('/verify-otp'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_dto_1.VerifyAdminOtp]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "verifyAdminotp", null);
__decorate([
    (0, common_1.Post)('/resend-otp'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_dto_1.ResendAdminOtpDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "resendAdminOtp", null);
__decorate([
    (0, common_1.Post)('/reset-password-link'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_dto_1.ResetAdminPasswordLink]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "resetAdminPasswordLink", null);
__decorate([
    (0, common_1.Post)('/reset-password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_dto_1.ResetAdminPassword]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "resetAdminPassword", null);
exports.AdminController = AdminController = __decorate([
    (0, common_1.Controller)('admin'),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], AdminController);
//# sourceMappingURL=admin.controller.js.map