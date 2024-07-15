import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator"


export class CreateTeacherDto {
    @IsNotEmpty({ message: 'fullname is required' })
    fullname: string;

    @IsNotEmpty({ message: 'username is required' })
    username: string;

    @IsNotEmpty({ message: 'qualification is required' })
    qualification: string;

    @IsNotEmpty({ message: 'email is required' })
    @IsEmail({}, { message: 'invalid email address' })
    email: string;

    @IsNotEmpty({ message: 'password is required' })
    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        minUppercase: 1
    })
    password: string;

}

export class UpdateTeacherDto {
    @IsNotEmpty()
    fullname: string;

    @IsNotEmpty()
    username: string;

    @IsNotEmpty( )
    qualification: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;
}