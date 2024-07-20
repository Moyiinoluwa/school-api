export interface IteacherOtp {
    otp: string;
    email: string;
    id: number;
    verified: boolean;
    expirationTime: Date;
    createdAt: Date;
}
export declare class TeacherOtpEntity implements IteacherOtp {
    id: number;
    otp: string;
    email: string;
    verified: boolean;
    expirationTime: Date;
    createdAt: Date;
}
