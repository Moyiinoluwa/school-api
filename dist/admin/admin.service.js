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
const bcrypt = require("bcrypt");
const admin_entity_1 = require("../Entity/admin.entity");
const nanoid_1 = require("nanoid");
const adminOtp_entity_1 = require("../Entity/adminOtp.entity");
const mailer_service_1 = require("../Mailer/mailer.service");
const common_repository_1 = require("../common/common.repository");
const typeorm_2 = require("typeorm");
const uuid_1 = require("uuid");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
let AdminService = class AdminService {
    constructor(adminRepository, adminOtpRepository, mailer, configService, jwt) {
        this.adminRepository = adminRepository;
        this.adminOtpRepository = adminOtpRepository;
        this.mailer = mailer;
        this.configService = configService;
        this.jwt = jwt;
    }
    async hashPassword(password) {
        return await bcrypt.hash(password, 12);
    }
    async comparePassword(password, userPassword) {
        return await bcrypt.compare(password, userPassword);
    }
    async signToken(id, email, role) {
        const payload = {
            sub: id,
            email,
            role
        };
        const secret = this.configService.get('SECRET_KEY');
        const token = this.jwt.signAsync(payload, {
            expiresIn: this.configService.get('EXPIRESIN'),
            secret: secret
        });
        return { accesToken: token };
    }
    async codeDigit() {
        const code = (0, nanoid_1.customAlphabet)('1234567890', 6);
        return code();
    }
    async registerAdmin(dto) {
        const admin = await this.adminRepository.findOne({ where: { email: dto.email } });
        if (admin) {
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
        await this.mailer.sendVerificationMail(dto.email, code, newAdmin.username);
        return { message: 'admin is regsitered' };
    }
    async verifyAdminOtp(dto) {
        const admin = await this.adminOtpRepository.findOne({ where: { email: dto.email } });
        if (!admin) {
            throw new common_1.HttpException('admin cannot verify otp', common_1.HttpStatus.NOT_FOUND);
        }
        const otp = await this.adminOtpRepository.findOne({ where: { otp: dto.otp } });
        if (!otp) {
            throw new common_1.HttpException('otp is not correct', common_1.HttpStatus.NOT_FOUND);
        }
        if (otp.expirationTime <= new Date()) {
            throw new common_1.HttpException('otp has expired', common_1.HttpStatus.FORBIDDEN);
        }
        const user = await this.adminRepository.findOne({ where: { email: dto.email } });
        if (user.email !== otp.email) {
            throw new common_1.HttpException('the email does not match the email the otp was sent to', common_1.HttpStatus.FORBIDDEN);
        }
        else {
            otp.verified = true;
        }
        return { isValid: true };
    }
    async resendAdminOtp(dto) {
        const admin = await this.adminRepository.findOne({ where: { email: dto.email } });
        if (!admin) {
            throw new common_1.HttpException('admin cannot reques a new code', common_1.HttpStatus.NOT_FOUND);
        }
        const previousCode = await this.adminOtpRepository.findOne({ where: { otp: dto.email, expirationTime: (0, typeorm_2.LessThan)(new Date()) } });
        if (previousCode) {
            throw new common_1.HttpException('previous code has not expired', common_1.HttpStatus.BAD_REQUEST);
        }
        const code = await this.codeDigit();
        const expiration = new Date();
        expiration.setMinutes(expiration.getMinutes() + 10);
        const newCode = new adminOtp_entity_1.AdminOtpEnitity();
        newCode.email = dto.email;
        newCode.expirationTime = expiration;
        newCode.createdAt = new Date();
        newCode.otp = code;
        await this.adminOtpRepository.save(newCode);
        await this.mailer.sendVerificationMail(dto.email, code, admin.username);
        return { message: 'New otp has been sent' };
    }
    async resetAdminPasswordLink(dto) {
        const admin = await this.adminRepository.findOne({ where: { email: dto.email } });
        if (!admin) {
            throw new common_1.HttpException('admin cannot request for password link', common_1.HttpStatus.NOT_FOUND);
        }
        const token = (0, uuid_1.v4)();
        const link = `http://localhost:5000/admin/reset-token${token}`;
        const date = new Date();
        date.setMinutes(date.getMinutes() + 10);
        await this.mailer.resetPasswordMail(dto.email, link, admin.username);
        admin.resetLink = link;
        admin.isResetLinkSent = true;
        admin.resetLinlExpirationTime = date;
        return { message: 'password reset link sent ' };
    }
    async resetAdminPassword(dto) {
        const admin = await this.adminRepository.findOne({ where: { email: dto.email } });
        if (!admin) {
            throw new common_1.HttpException('admin cannot reset pasword', common_1.HttpStatus.NOT_FOUND);
        }
        if (admin.resetLink !== dto.resetLink) {
            throw new common_1.HttpException('invalid reset link', common_1.HttpStatus.NOT_FOUND);
        }
        const hash = await this.hashPassword(dto.password);
        admin.password = hash;
        return { message: 'password reset' };
    }
    async adminLogin(dto) {
        const admin = await this.adminRepository.findOne({ where: { email: dto.email } });
        if (!admin) {
            throw new common_1.BadRequestException('Admin is not registered');
        }
        const addmin = this.comparePassword(dto.password, admin.password);
        if (!addmin) {
            admin.loginCount = +1;
            throw new common_1.BadRequestException('Incorrect password');
        }
        if (admin.loginCount >= 5) {
            admin.isLocked = true;
            admin.lockedUntil = new Date(Date.now() + 2 * 60 * 60 * 1000);
            throw new common_1.BadRequestException('invalid password, account locked for two hours');
        }
        admin.loginCount = 0;
        admin.isLoggedIn = true;
        await this.adminRepository.save(admin);
        return await this.signToken(admin.id, admin.email, admin.role);
    }
    async changeAdminPassword(dto, id) {
        const admin = await this.adminRepository.findOne({ where: { id } });
        if (!admin) {
            throw new common_1.BadRequestException('Admin cannot change password');
        }
        const pass = await this.comparePassword(dto.oldPassword, admin.password);
        if (!pass) {
            throw new common_1.BadRequestException('the password you entered is incorrect');
        }
        const hash = await this.hashPassword(dto.newPassword);
        admin.password = hash;
        await this.adminRepository.save(admin);
        return { message: 'new password ' };
    }
    async updateAdmin(id, dto) {
        const admin = await this.adminRepository.findOne({ where: { id } });
        if (!admin) {
            throw new common_1.BadRequestException('admin cannot update profile');
        }
        admin.email = dto.email;
        admin.fullname = dto.fullname;
        admin.username = dto.username;
        await this.adminRepository.save(admin);
        return { message: 'Profile updated' };
    }
    async deleteAdmin(id) {
        const admin = await this.adminRepository.findOne({ where: { id } });
        if (!admin) {
            throw new common_1.BadRequestException('cannot delete admin');
        }
        await this.adminRepository.remove(admin);
        return { message: 'admin deleted' };
    }
    async getAdmins() {
        const admin = await this.adminRepository.find();
        return admin;
    }
    async getAdmin(id) {
        const admin = await this.adminRepository.findOne({ where: { id } });
        if (!admin) {
            throw new common_1.BadRequestException('cannot get admin');
        }
        else {
            return admin;
        }
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(admin_repository_1.AdminRepository)),
    __param(1, (0, typeorm_1.InjectRepository)(common_repository_1.AdminOtpRepository)),
    __metadata("design:paramtypes", [admin_repository_1.AdminRepository,
        common_repository_1.AdminOtpRepository,
        mailer_service_1.Mailer,
        config_1.ConfigService,
        jwt_1.JwtService])
], AdminService);
//# sourceMappingURL=admin.service.js.map