import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto, UpdateAdminDto } from './admin.dto';
import { VerifyAdminOtp, ResendAdminOtpDto, ResetAdminPasswordLink, ResetAdminPassword, LoginDto, ChangeApassword } from 'src/common/common.dto';

@Controller('admin')
export class AdminController {
    constructor(private adminService: AdminService) { }

    @Post('/register')
    async registerAdmin(@Body() dto: CreateAdminDto) {
        return await this.adminService.registerAdmin(dto)
    }

    @Post('/verify-otp')
    async verifyAdminotp(@Body() dto: VerifyAdminOtp) {
        return await this.adminService.verifyAdminOtp(dto)
    }

    @Post('/resend-otp')
    async resendAdminOtp(@Body() dto: ResendAdminOtpDto) {
        return await this.adminService.resendAdminOtp(dto)
    }

    @Post('/reset-password-link')
    async resetAdminPasswordLink(@Body() dto: ResetAdminPasswordLink) {
        return await this.adminService.resetAdminPasswordLink(dto)
    }

    @Post('/reset-password')
    async resetAdminPassword(@Body() dto: ResetAdminPassword) {
        return await this.adminService.resetAdminPassword(dto)
    }

    @Post('/login')
    async loginAdmin(@Body() dto: LoginDto) {
        return await this.adminService.adminLogin(dto)
    }

    @Get('/get')
    async getAdmins() {
        return await this.adminService.getAdmins()
    }

    @Get('/get/:id')
    async getAdmin(@Param('id') id: number) {
        return await this.adminService.getAdmin(id)
    }

    @Patch('/change/:id')
    async changeAdmin(@Body() dto: ChangeApassword, @Param('id') id: number) {
        return await this.adminService.changeAdminPassword(dto, id)
    }

    @Put('/update/:id')
    async updateAdmin(@Param('id') id: number, @Body() dto: UpdateAdminDto) {
        return await this.adminService.updateAdmin(id, dto)
    }

    @Delete('/delete/:id')
    async deleteAdmin(@Param('id') id: number) {
        return await this.adminService.deleteAdmin(id)
    }

}
