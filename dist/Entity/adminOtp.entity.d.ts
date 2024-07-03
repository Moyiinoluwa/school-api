export interface IAdminOtp {
    id: string;
    otp: string;
    email: string;
    expirationTime: Date;
    createdAt: Date;
    verified: boolean;
}
export declare class AdminOtpEnitity implements IAdminOtp {
    id: string;
    otp: string;
    email: string;
    expirationTime: Date;
    createdAt: Date;
    verified: boolean;
}
