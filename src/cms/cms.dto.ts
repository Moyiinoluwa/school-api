import { IsNotEmpty } from "class-validator";

//student check scores
 export class StudentScoreDto {
    @IsNotEmpty()
    score: number
 }