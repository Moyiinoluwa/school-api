import { Body, Controller, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { CreateTeacherDto, UpdateTeacherDto } from './teacher.dto';
import { TeacherService } from './teacher.service';
import { ChangeApassword, LoginDto, ResetDto, resendTeacherOtpDto, resetTeacherPasswordDto, verifyTeacherOtpDto } from 'src/common/common.dto'; 

@Controller('teacher')
export class TeacherController {
    constructor(private teacherService: TeacherService) {}

    @Post('/register')
    async register(@Body() dto: CreateTeacherDto) {
        return await this.teacherService.createTeacher(dto)
    }

    @Post('/verify-otp')
    async verifyCode(@Body() dto: verifyTeacherOtpDto) {
        return await this.teacherService.verifyCode(dto)
    }

    @Post('/resend-otp')
    async resendCode(@Body() dto: resendTeacherOtpDto) {
        return await this.teacherService.resendCode(dto)
    }

    @Post('/reset-password-link')
    async resetPasswordLink(@Body() dto: ResetDto) {
        return await this.teacherService.resetTeacherPasswordLink(dto)
    }

    @Post('/reset-password') 
    async resetPassword(@Body() dto: resetTeacherPasswordDto) {
        return await this.teacherService.resetTeacherPassword(dto)
    }

    @Put('/update/:id')
    async updateTeacher(@Param('id') id: number, @Body() dto: UpdateTeacherDto) {
        return await this.teacherService.updateTeacher(id, dto)
    }

    @Post('/login') 
    async login(@Body() dto: LoginDto) {
        return await this.teacherService.loginTeacher(dto)
    }

    @Patch('/change/:id')
    async changePassword(@Param('id') id: number, @Body() dto: ChangeApassword) {
        return await this.teacherService.changeTeacherPassword(id, dto)
    }

    @Get('/all')
    async getAll() {
        return await this.teacherService.getTeachers()
    }

    @Get('/get/:id')
    async getOne(@Param('id') id: number) {
        return await this.teacherService.getTeacher(id)
    }
}
