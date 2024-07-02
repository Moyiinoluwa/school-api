export interface IteacherOtp {
    otp: string;
    email: string;
    id: string;
    verified: boolean;
    expirationTime: Date;
    createdAt: Date;
}
export declare class TeacherOtpEntity implements IteacherOtp {
    id: string;
    otp: string;
    email: string;
    verified: boolean;
    expirationTime: Date;
    createdAt: Date;
}
