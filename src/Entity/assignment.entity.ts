import { IsNotEmpty, IsString } from "class-validator";
import { CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

export interface IAssignment {
    studentId: string;
    teacherid: string;
    subject: string;
    score: number;
    id: string
    date: Date;
}

@Entity({name: 'Assignment'})
export class AssignmentEntity implements IAssignment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @IsNotEmpty()
    @IsString()
    subject: string;

    @IsNotEmpty()
    score: number;

    @IsNotEmpty()
    @IsString()
    studentId: string;

    @IsNotEmpty()
    @IsString()
    teacherid: string;

    @CreateDateColumn({nullable: false})
    date: Date;
}