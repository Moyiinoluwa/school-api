import { Role } from "src/Enum/general.enum";
export interface IAdmin {
    id: number;
    fullname: string;
    email: string;
    password: string;
    username: string;
    createdAt: Date;
    isVerified: boolean;
    isRegistered: boolean;
    isLoggedIn: boolean;
    isLoggedOut: boolean;
    loginCount: number;
    isLocked: boolean;
    lockedUntil: Date;
    resetLink: string;
    isResetLinkSent: boolean;
    resetLinlExpirationTime: Date;
    role: Role;
}
export declare class AdminEntity implements IAdmin {
    id: number;
    fullname: string;
    email: string;
    password: string;
    username: string;
    createdAt: Date;
    isVerified: boolean;
    isLoggedIn: boolean;
    isLoggedOut: boolean;
    isRegistered: boolean;
    resetLink: string;
    isResetLinkSent: boolean;
    resetLinlExpirationTime: Date;
    role: Role;
    loginCount: number;
    isLocked: boolean;
    lockedUntil: Date;
}
