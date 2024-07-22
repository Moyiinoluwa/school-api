import { AdminService } from './admin.service';
import { CreateAdminDto, UpdateAdminDto } from './admin.dto';
import { VerifyAdminOtp, ResendAdminOtpDto, ResetAdminPasswordLink, ResetAdminPassword, LoginDto, ChangeApassword } from 'src/common/common.dto';
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
    loginAdmin(dto: LoginDto): Promise<{
        accesToken: Promise<string>;
    }>;
    getAdmins(): Promise<import("../Entity/admin.entity").AdminEntity[]>;
    getAdmin(id: number): Promise<import("../Entity/admin.entity").AdminEntity>;
    changeAdmin(dto: ChangeApassword, id: number): Promise<{
        message: string;
    }>;
    updateAdmin(id: number, dto: UpdateAdminDto): Promise<{
        message: string;
    }>;
    deleteAdmin(id: number): Promise<{
        message: string;
    }>;
}
