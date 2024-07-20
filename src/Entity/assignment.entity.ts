import { IsNotEmpty, IsString } from "class-validator";
import { CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { StudentEntity } from "./student.entity";
import { TeacherEntity } from "./teacher.entity";

export interface IAssignment {
    studentId: number;
    teacherId: number;
    subject: string;
    score: number;
    id: number;
    date: Date;
    assignment: string;
}

@Entity({name: 'Assignment'})
export class AssignmentEntity implements IAssignment {
    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @IsString()
    subject: string;

    @IsNotEmpty()
    score: number;

    @IsNotEmpty()
    @IsString()
    assignment: string;

    @IsNotEmpty()
    @IsString()
    studentId: number;

    @IsNotEmpty()
    @IsString()
    teacherId: number;

    @CreateDateColumn({nullable: false})
    date: Date;

    //many student can have the same assignment
    @ManyToOne(() => StudentEntity, student => student.assignment)
    student: StudentEntity[];

    //many teacher can send assignment
    @ManyToOne(() => TeacherEntity, teacher => teacher.assignment)
    teacher: TeacherEntity[];
}