import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { StudentEntity } from "./student.entity";

export interface IStudentOtp {
    id: number;
    otp: string;
    email: string;
    verified: boolean;
    date: Date
    expirationTime: Date;
}

@Entity({ name: 'studentOtp'})
export class StudentOtpEntity implements IStudentOtp{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    otp: string

    @Column({ unique: true })
    email: string

    @Column({ type: 'boolean', default: 'false'})
    verified: boolean

    @Column()
    expirationTime: Date

    @CreateDateColumn({ type: 'date', nullable: false})
    date: Date;
     
    @OneToOne(() => StudentEntity, (student) => student.studentOtp)
    @JoinColumn()
    student: StudentEntity
}