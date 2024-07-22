import { AdminRepository } from './admin.repository';
import { CreateAdminDto, UpdateAdminDto } from './admin.dto';
import { AdminEntity } from 'src/Entity/admin.entity';
import { Mailer } from 'src/Mailer/mailer.service';
import { AdminOtpRepository } from 'src/common/common.repository';
import { VerifyAdminOtp, ResendAdminOtpDto, ResetAdminPasswordLink, ResetAdminPassword, LoginDto, ChangeApassword } from 'src/common/common.dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
export declare class AdminService {
    private readonly adminRepository;
    private readonly adminOtpRepository;
    private readonly mailer;
    private configService;
    private jwt;
    constructor(adminRepository: AdminRepository, adminOtpRepository: AdminOtpRepository, mailer: Mailer, configService: ConfigService, jwt: JwtService);
    hashPassword(password: any): Promise<string>;
    comparePassword(password: any, userPassword: any): Promise<boolean>;
    signToken(id: number, email: string, role: string): Promise<{
        accesToken: Promise<string>;
    }>;
    codeDigit(): Promise<string>;
    registerAdmin(dto: CreateAdminDto): Promise<{
        message: string;
    }>;
    verifyAdminOtp(dto: VerifyAdminOtp): Promise<{
        isValid: true;
    }>;
    resendAdminOtp(dto: ResendAdminOtpDto): Promise<{
        message: string;
    }>;
    resetAdminPasswordLink(dto: ResetAdminPasswordLink): Promise<{
        message: string;
    }>;
    resetAdminPassword(dto: ResetAdminPassword): Promise<{
        message: string;
    }>;
    adminLogin(dto: LoginDto): Promise<{
        accesToken: Promise<string>;
    }>;
    changeAdminPassword(dto: ChangeApassword, id: number): Promise<{
        message: string;
    }>;
    updateAdmin(id: number, dto: UpdateAdminDto): Promise<{
        message: string;
    }>;
    deleteAdmin(id: number): Promise<{
        message: string;
    }>;
    getAdmins(): Promise<AdminEntity[]>;
    getAdmin(id: number): Promise<AdminEntity>;
}
