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
    isResetLink: string;
    resetPasswordLinkExpirationTime: Date;
    isresetPasswordLinkSent: boolean;
}
