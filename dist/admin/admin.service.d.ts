import { AdminRepository } from './admin.repository';
import { CreateAdminDto } from './admin.dto';
import { Mailer } from 'src/Mailer/mailer.service';
import { AdminOtpRepository } from 'src/common/common.repository';
import { VerifyAdminOtp, ResendAdminOtpDto, ResetAdminPasswordLink, ResetAdminPassword } from 'src/common/common.dto';
export declare class AdminService {
    private readonly adminRepository;
    private readonly adminOtpRepository;
    private readonly mailer;
    constructor(adminRepository: AdminRepository, adminOtpRepository: AdminOtpRepository, mailer: Mailer);
    hashPassword(password: any): Promise<string>;
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
}
