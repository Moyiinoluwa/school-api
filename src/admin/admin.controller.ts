import { Body, Controller, Post } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './admin.dto';
import { VerifyAdminOtp, ResendAdminOtpDto, ResetAdminPasswordLink, ResetAdminPassword } from 'src/common/common.dto';

@Controller('admin')
export class AdminController {
    constructor ( private adminService: AdminService) {}

    @Post('/register')
    async registerAdmin(@Body() dto: CreateAdminDto): Promise<{ message: string}> {
        return await this.adminService.registerAdmin(dto)
    }

    @Post('/verify-otp') 
        async verifyAdminotp(@Body() dto: VerifyAdminOtp): Promise<{ isValid: true}> {
            return this.adminService.verifyAdminOtp(dto)
    }

    @Post('/resend-otp')
    async resendAdminOtp(@Body() dto: ResendAdminOtpDto): Promise<{ message: string}> {
        return this.adminService.resendAdminOtp(dto)
    }

    @Post('/reset-password-link')
    async resetAdminPasswordLink(@Body() dto: ResetAdminPasswordLink): Promise<{ message: string }> {
        return this.adminService.resetAdminPasswordLink(dto)
    }

    @Post('/reset-password')
    async resetAdminPassword(@Body() dto: ResetAdminPassword): Promise<{ message: string }> {
        return this.adminService.resetAdminPassword(dto)
    }
}
