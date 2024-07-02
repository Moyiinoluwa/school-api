import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator"

//verify student otp
export class VerifyOtpDto {
     @IsEmail()
     @IsNotEmpty()
     email: string

    @IsString()
    @IsNotEmpty()
    otp: string
}

//resend student otp
export class ResendOtpDto {
    @IsEmail()
    @IsNotEmpty()
    email: string
}

//reset student password link
export class ResetPasswordLinkDto {
    @IsEmail()
    @IsNotEmpty()
    email: string
}

//resset student password
export class ResetPassword {
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    resetLink: string

    @IsString()
    @IsNotEmpty()
    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minSymbols: 1,
        minNumbers: 1
    })
    password: string
}

//student login
export class LoginDto {
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minSymbols: 1,
        minNumbers: 1
    })
    password: string
}

//verify teacher otp
export class verifyTeacherOtpDto {
    @IsNotEmpty()
    @IsString()
    otp: string

    @IsEmail()
    @IsNotEmpty()
    email: string
}

//resend teacher verification code
export class resendTeacherOtpDto{
    @IsEmail()
    @IsNotEmpty()
    email: string
}