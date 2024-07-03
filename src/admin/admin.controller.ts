import { Body, Controller, Post } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './admin.dto';

@Controller('admin')
export class AdminController {
    constructor ( private adminService: AdminService) {}

    @Post('/register')
    async registerAdmin(@Body() dto: CreateAdminDto): Promise<{ message: string}> {
        return await this.adminService.registerAdmin(dto)
    }
}
