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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const admin_repository_1 = require("./admin.repository");
const common_repository_1 = require("../common/common.repository");
const bcrypt = require("bcrypt");
const admin_entity_1 = require("../Entity/admin.entity");
const nanoid_1 = require("nanoid");
const adminOtp_entity_1 = require("../Entity/adminOtp.entity");
const mailer_service_1 = require("../Mailer/mailer.service");
let AdminService = class AdminService {
    constructor(adminRepository, adminOtpRepository, mailer) {
        this.adminRepository = adminRepository;
        this.adminOtpRepository = adminOtpRepository;
        this.mailer = mailer;
    }
    async hashPassword(password) {
        return await bcrypt.hash(password, 12);
    }
    async codeDigit() {
        const code = (0, nanoid_1.customAlphabet)('1234567890', 6);
        return code();
    }
    async registerAdmin(dto) {
        const admin = await this.adminRepository.findOne({ where: { email: dto.email } });
        if (!admin) {
            throw new common_1.HttpException('admin is registered', common_1.HttpStatus.FOUND);
        }
        const hash = await this.hashPassword(dto.password);
        const newAdmin = new admin_entity_1.AdminEntity();
        newAdmin.fullname = dto.fullname;
        newAdmin.email = dto.email;
        newAdmin.username = dto.username;
        newAdmin.createdAt = new Date();
        newAdmin.password = hash;
        await this.adminRepository.save(newAdmin);
        const code = await this.codeDigit();
        const codeLimit = new Date();
        codeLimit.setMinutes(codeLimit.getMinutes() + 10);
        const otpCode = new adminOtp_entity_1.AdminOtpEnitity();
        otpCode.email = dto.email;
        otpCode.expirationTime = codeLimit;
        otpCode.createdAt = new Date();
        otpCode.otp = code;
        await this.adminOtpRepository.save(otpCode);
        await this.mailer.sendVerificationMail(dto.email, code, admin.username);
        return { message: 'admin is regsitered' };
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(admin_repository_1.AdminRepository)),
    __param(1, (0, typeorm_1.InjectRepository)(common_repository_1.AdminOtpRepository)),
    __metadata("design:paramtypes", [admin_repository_1.AdminRepository,
        common_repository_1.AdminOtpRepository,
        mailer_service_1.Mailer])
], AdminService);
//# sourceMappingURL=admin.service.js.map