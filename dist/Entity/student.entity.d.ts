import { Role } from "src/Enum/general.enum";
import { BaseEntity } from "typeorm";
export declare class StudentEntity extends BaseEntity {
    id: string;
    username: string;
    surname: string;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    isActive: boolean;
    isLoggedIn: boolean;
    isLoggedOut: boolean;
    isVerified: boolean;
    isRegistered: boolean;
    loginCount: number;
    isLocked: boolean;
    locked_until: Date;
    isResetLink: string;
    resetPasswordLinkExpirationTime: Date;
    isresetPasswordLinkSent: boolean;
    role: Role;
    profilePicture: string;
    score: number;
    studentOtp: StudentEntity;
}
