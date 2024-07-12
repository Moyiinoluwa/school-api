import { IsNotEmpty, IsString } from "class-validator";

//student check scores
export class StudentViewScoreDto {
    @IsNotEmpty()
    @IsString()
    id: string

    @IsNotEmpty()
    @IsString()
    subject: string
}