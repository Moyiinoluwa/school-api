import { Role } from "src/Enum/general.enum";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

export interface ITeacher {
    fullname: string;
    username: string;
    qualification: string;
    email: string;
    password: string
    id: string
    createdAt: Date;
    isActive: true
    isRegistered: boolean
    isLoggedIn: boolean
    isLoggedOut: boolean
    isVerified: boolean
    resetLink: string
    isResetLinkSent: boolean
    resetPasswordLinkExipration: Date
    role: Role
}
    @Entity({ name: 'teacher'})
export class TeacherEntity implements ITeacher {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false })
    fullname: string;

    @Column({ unique: true, nullable: false })
    username: string;

    @Column({ nullable: false })
    qualification: string;

    @Column({ unique: true, nullable: false })
    email: string;

    @Column({ nullable: false })
    password: string;

    @CreateDateColumn({ nullable: false})
    createdAt: Date;

    @Column({ default: true })
    isActive: true

    @Column({ nullable: false, default: false })
    isVerified: boolean

    @Column({ default: false, nullable: false})
    isRegistered: boolean

    @Column({ nullable: false, default: false})
    isLoggedIn: boolean

    @Column({ default: false, nullable: false})
    isLoggedOut: boolean

    @Column({ nullable: true })
    resetLink: string
    
    @Column({ nullable: false, default: false}) 
    isResetLinkSent: boolean

    @Column({nullable: true })
    resetPasswordLinkExipration: Date

    @Column({ nullable: false, type: 'enum', enum: Role, default: Role.TEACHER})
    role: Role;
}