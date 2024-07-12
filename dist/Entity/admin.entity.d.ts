import { Role } from "src/Enum/general.enum";
export interface IAdmin {
    id: string;
    fullname: string;
    email: string;
    password: string;
    username: string;
    createdAt: Date;
    isRegistered: boolean;
    isLoggedIn: boolean;
    isLoggedOut: boolean;
    resetLink: string;
    isResetLinkSent: boolean;
    resetLinlExpirationTime: Date;
    role: Role;
}
export declare class AdminEntity implements IAdmin {
    id: string;
    fullname: string;
    email: string;
    password: string;
    username: string;
    createdAt: Date;
    isLoggedIn: boolean;
    isLoggedOut: boolean;
    isRegistered: boolean;
    resetLink: string;
    isResetLinkSent: boolean;
    resetLinlExpirationTime: Date;
    role: Role;
}
