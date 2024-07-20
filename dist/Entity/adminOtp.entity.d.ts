export interface IAdminOtp {
    id: number;
    otp: string;
    email: string;
    expirationTime: Date;
    createdAt: Date;
    verified: boolean;
}
export declare class AdminOtpEnitity implements IAdminOtp {
    id: number;
    otp: string;
    email: string;
    expirationTime: Date;
    createdAt: Date;
    verified: boolean;
}
