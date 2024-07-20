import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export interface IteacherOtp {
    otp: string;
    email: string;
    id: number;
    verified: boolean;
    expirationTime: Date;
    createdAt: Date
}

@Entity({ name: 'teacherOtp'})
export class TeacherOtpEntity implements IteacherOtp {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    otp: string;

    @Column({ unique: true})
    email: string;

    @Column({ type: 'boolean', default: false })
    verified: boolean;

    @Column()
    expirationTime: Date;

    @Column({ type: 'date', nullable: false})
    createdAt: Date;
}