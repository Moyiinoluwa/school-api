import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator"

export class CreateAdminDto {
    @IsNotEmpty({ message: 'fullname is required'})
    @IsString()
    fullname: string

    @IsNotEmpty({ message: 'email is required'})
    @IsEmail()
    email: string
    
    @IsNotEmpty({ message: 'password is required'})
    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        minUppercase: 1
    })
    password: string

    @IsNotEmpty({ message: 'username is required'})
    @IsString()
    username: string
}