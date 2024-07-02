import { Body, Controller, Post } from '@nestjs/common';
import { CreateTeacherDto } from './teacher.dto';
import { TeacherService } from './teacher.service';
import { resendTeacherOtpDto, verifyTeacherOtpDto } from 'src/common/common.dto';

@Controller('teacher')
export class TeacherController {
    constructor(private teacherService: TeacherService) {}

    @Post('/register')
    async register(@Body() dto: CreateTeacherDto): Promise<{ message: string}> {
        return await this.teacherService.createTeacher(dto)
    }

    @Post('/verify-otp')
    async verifyCode(@Body() dto: verifyTeacherOtpDto): Promise<{ isValid: boolean}> {
        return await this.teacherService.verifyCode(dto)
    }

    @Post('/resend-otp')
    async resendCode(@Body() dto: resendTeacherOtpDto): Promise<{ message: string}> {
        return await this.teacherService.resendCode(dto)
    }
}
