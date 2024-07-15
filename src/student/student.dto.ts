import { IsEmail, IsNotEmpty, IsStrongPassword, MaxLength, MinLength } from "class-validator";

export class CreateStudentDto {
    @IsNotEmpty({ message: 'Username is required' })
    username: string;

    @IsNotEmpty({ message: 'Name is required' })
    name: string;

    @IsNotEmpty({ message: 'Surname is required' })
    surname: string;

    @IsNotEmpty({ message: 'Please enter your email' })
    @IsEmail({}, { message: 'Invalid email address' })
    email: string;

    @IsNotEmpty({ message: 'Please enter your password' })
     @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        minUppercase: 1
     })
    password: string;  
}

export class UpdateStudentDto {
    @IsNotEmpty({ message: 'Username is required' })
    username: string;

    @IsNotEmpty({ message: 'Name is required' })
    name: string;

    @IsNotEmpty({ message: 'Surname is required' })
    surname: string;

    @IsNotEmpty({ message: 'Please enter your email' })
    @IsEmail({}, { message: 'Invalid email address' })
    email: string;

}
