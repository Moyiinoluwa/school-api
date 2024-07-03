import { AdminService } from './admin.service';
import { CreateAdminDto } from './admin.dto';
export declare class AdminController {
    private adminService;
    constructor(adminService: AdminService);
    registerAdmin(dto: CreateAdminDto): Promise<{
        message: string;
    }>;
}
