import { Role } from "src/Enum/general.enum";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { StudentOtpEntity } from "./otp.entity";
import { AssignmentEntity } from "./assignment.entity";
import { TeacherEntity } from "./teacher.entity";
import { MessageEntity } from "./message.entity";

@Entity({ name: 'student'})
export class StudentEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false, unique: true})
    username: string;

    @Column({nullable: false})
    surname: string;

    @Column({nullable: false})
    name: string;

    @Column({nullable: false, unique: true})
    email: string;

    @Column({nullable: false})
    password: string;

    @CreateDateColumn({nullable: false})
    createdAt: Date;

    @Column({default: true})
    isActive: boolean;

    @Column({ nullable: false, default: false})
    isLoggedIn: boolean;

    @Column({ nullable: false, default: false})
    isLoggedOut: boolean;

    @Column({ nullable: false, default: false})
    isVerified: boolean;

    @Column({ nullable: false, default: false})
    isRegistered: boolean;

    @Column({ nullable: false, default: 0})
    loginCount: number;

    @Column({ nullable: true})
    isLocked: boolean;

    @Column({ nullable: true })
    locked_until: Date;
    
    @Column({ nullable: true})
    isResetLink: string;

    @Column({ nullable: true})
    resetPasswordLinkExpirationTime: Date;

    @Column({ nullable: false, default: false })
    isresetPasswordLinkSent: boolean;

    @Column({ nullable: false, type: 'enum', enum: Role, default: Role.STUDENT})
    role: Role

    @Column({ nullable: true })
    profilePicture: string

    @Column({ nullable: true })
    score: number

    @Column({ nullable: true})
    answer: string

    // @Column({ nullable: true})
    // assignment: string
    
     @OneToOne(() => StudentOtpEntity, (studentOtp) => studentOtp.student )
     studentOtp: StudentEntity[];

     //one student has many assignment
    @OneToMany(() => AssignmentEntity, assignment => assignment.student)
    assignment: AssignmentEntity[];

    //many teacher can send assignment to student
    @ManyToOne(() => TeacherEntity, teacher => teacher.student)
    teacher: TeacherEntity[];

    @OneToMany(() => MessageEntity, message => message.senders)
    senders: MessageEntity[];

    @OneToMany(() => MessageEntity, message => message.receivers)
    receivers: MessageEntity[];
}

