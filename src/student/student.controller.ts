import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto, UpdateStudentDto } from './student.dto';
import { ChangePasswordDto, LoginDto, ResendOtpDto, ResetPassword, ResetPasswordLinkDto, VerifyOtpDto } from 'src/common/common.dto';

@Controller('student')
export class StudentController {
    constructor(private studentService: StudentService) {}

    //register
    @Post('/register')
    async CreateStudent(@Body() dto: CreateStudentDto) {
        return await this.studentService.createStudent(dto)
    }

    //Login
    @Post('/login')
    async login(@Body() dto: LoginDto) {
        return await this.studentService.login(dto)
    }

    //verify otp
    @Post('/verify-otp')
    async VerifyOtpDto(@Body() dto: VerifyOtpDto) {
        return await this.studentService.verifyOtp(dto)
    }

    //resend otp
    @Post('/resend-otp')
    async ResendOtp(@Body() dto: ResendOtpDto) {
        return await this.studentService.ResendOtp(dto)
    }

    //reset password link
    @Post('/reset-password-link')
    async ResetPasswordLink(@Body() dto: ResetPasswordLinkDto) {
        return await this.studentService.ResetPasswordLink(dto)
    }

    //Reset password
    @Post('/reset-password')
    async ResetPassword(@Body() dto: ResetPassword) {
        return await this.studentService.ResetPassword(dto)
    }

    //update profile
    @Put('/update/:id')
    async updateProfile(@Body() dto: UpdateStudentDto, @Param('id') id: number) {
        return await this.studentService.updateProfile(dto, id)
    }
    
    //Change password
    @Put('/change/:id')
    async changePassword(@Param('id') id: number, @Body() dto: ChangePasswordDto) {
        return await this.studentService.changePassword(id, dto)
    }

    //Get all student
    @Get('/get')
    async allStudent() {
        return await this.studentService.getAll()
    }

    //Get one student
    @Get('/get/:id')
    async oneStudent(@Param('id') id: number) {
        return await this.studentService.getOneStudent(id)
    }
}
