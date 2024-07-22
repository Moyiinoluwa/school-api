import { IsEmail, IsNotEmpty, IsString } from "class-validator";

//student check scores
 export class StudentScoreDto {
    @IsNotEmpty()
    score: number

    @IsNotEmpty()
    subject: string
 }

 //send mail to student
 export class SendMailToStudent {
   @IsNotEmpty()
   @IsEmail()
   email: string

   @IsNotEmpty()
   @IsString()
   username: string
 }

 //send mail to teachers
 export class SendEmailTeacher {
   @IsNotEmpty()
   @IsEmail()
   email: string

   @IsNotEmpty()
   name: string
 }