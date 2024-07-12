import { Role } from "src/Enum/general.enum";
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'student'})
export class StudentEntity extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

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
}

