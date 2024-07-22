"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminModule = void 0;
const common_1 = require("@nestjs/common");
const admin_controller_1 = require("./admin.controller");
const admin_service_1 = require("./admin.service");
const typeorm_1 = require("@nestjs/typeorm");
const admin_entity_1 = require("../Entity/admin.entity");
const adminOtp_entity_1 = require("../Entity/adminOtp.entity");
const admin_repository_1 = require("./admin.repository");
const mailer_service_1 = require("../Mailer/mailer.service");
const common_repository_1 = require("../common/common.repository");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
let AdminModule = class AdminModule {
};
exports.AdminModule = AdminModule;
exports.AdminModule = AdminModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([admin_entity_1.AdminEntity, adminOtp_entity_1.AdminOtpEnitity])],
        controllers: [admin_controller_1.AdminController],
        providers: [admin_service_1.AdminService, admin_repository_1.AdminRepository, common_repository_1.AdminOtpRepository, mailer_service_1.Mailer, jwt_1.JwtService, config_1.ConfigService]
    })
], AdminModule);
//# sourceMappingURL=admin.module.js.map