import { AdminService } from './admin.service';
import { CreateAdminDto } from './admin.dto';
import { VerifyAdminOtp, ResendAdminOtpDto, ResetAdminPasswordLink, ResetAdminPassword } from 'src/common/common.dto';
export declare class AdminController {
    private adminService;
    constructor(adminService: AdminService);
    registerAdmin(dto: CreateAdminDto): Promise<{
        message: string;
    }>;
    verifyAdminotp(dto: VerifyAdminOtp): Promise<{
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
