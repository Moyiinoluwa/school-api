import { AdminRepository } from './admin.repository';
import { AdminOtpRepository } from 'src/common/common.repository';
import { CreateAdminDto } from './admin.dto';
import { Mailer } from 'src/Mailer/mailer.service';
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
}
