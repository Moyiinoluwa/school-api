import { Role } from "src/Enum/general.enum";
export interface ITeacher {
    fullname: string;
    username: string;
    qualification: string;
    email: string;
    password: string;
    id: string;
    createdAt: Date;
    isActive: true;
    isRegistered: boolean;
    isLoggedIn: boolean;
    isLoggedOut: boolean;
    isVerified: boolean;
    resetLink: string;
    isResetLinkSent: boolean;
    resetPasswordLinkExipration: Date;
    role: Role;
    loginCount: number;
    isLocked: boolean;
    locked_until: Date;
    profilePicture: string;
}
export declare class TeacherEntity implements ITeacher {
    id: string;
    fullname: string;
    username: string;
    qualification: string;
    email: string;
    password: string;
    createdAt: Date;
    isActive: true;
    isVerified: boolean;
    isRegistered: boolean;
    isLoggedIn: boolean;
    isLoggedOut: boolean;
    resetLink: string;
    isResetLinkSent: boolean;
    resetPasswordLinkExipration: Date;
    role: Role;
    loginCount: number;
    isLocked: boolean;
    locked_until: Date;
    profilePicture: string;
}
