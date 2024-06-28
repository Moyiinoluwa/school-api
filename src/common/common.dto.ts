import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator"

export class VerifyOtpDto {
     @IsEmail()
     @IsNotEmpty()
     email: string

    @IsString()
    @IsNotEmpty()
    otp: string
}

export class ResendOtpDto {
    @IsEmail()
    @IsNotEmpty()
    email: string
}

export class ResetPasswordLinkDto {
    @IsEmail()
    @IsNotEmpty()
    email: string
}

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