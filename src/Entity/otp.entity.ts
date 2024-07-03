import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

export interface IStudentOtp {
    id: string;
    otp: string;
    email: string;
    verified: boolean;
    date: Date
    expirationTime: Date;
}

@Entity({ name: 'otp'})
export class StudentOtpEntity implements IStudentOtp{
    @PrimaryGeneratedColumn('uuid')
    id: string

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
     
}