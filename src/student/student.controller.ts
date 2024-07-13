import { Body, Controller, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto, UpdateStudentDto } from './student.dto';
import { LoginDto, ResendOtpDto, ResetPassword, ResetPasswordLinkDto, VerifyOtpDto } from 'src/common/common.dto';

@Controller('student')
export class StudentController {
    constructor(private studentService: StudentService) { }

    //register
    @Post('/register')
    @UsePipes(ValidationPipe)
    async CreateStudent(@Body() dto: CreateStudentDto): Promise<{ message: string }> {
        return await this.studentService.createStudent(dto)
    }

    //verify otp
    @Post('/verify-otp')
    async VerifyOtpDto(@Body() dto: VerifyOtpDto): Promise<{ isValid: boolean }> {
        return await this.studentService.verifyOtp(dto)
    }

    //resend otp
    @Post('/resend-otp')
    async ResendOtp(@Body() dto: ResendOtpDto): Promise<{ message: string }> {
        return await this.studentService.ResendOtp(dto)
    }

    //reset password link
    @Post('/reset-password-link')
    async ResetPasswordLink(@Body() dto: ResetPasswordLinkDto): Promise<{message: string}> {
        return await this.studentService.ResetPasswordLink(dto)
    }

    //Reset password
    @Post('/reset-password')
    async ResetPassword(@Body() dto: ResetPassword): Promise<{message: string}> {
        return await this.studentService.ResetPassword(dto)
    }

    //Login
    @Post('/login')
    async login(@Body() dto: LoginDto) {
        return await this.studentService.login(dto)
    }

    //update profile
//     @Put('/update/:id')
//     async updateProfile( @Body() dto: UpdateStudentDto, @Param('userId') userId: string): Promise<{ message: string}> {
//     return await this.studentService.updateProfile(dto, userId)
// }

}
