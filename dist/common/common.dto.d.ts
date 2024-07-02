export declare class VerifyOtpDto {
    email: string;
    otp: string;
}
export declare class ResendOtpDto {
    email: string;
}
export declare class ResetPasswordLinkDto {
    email: string;
}
export declare class ResetPassword {
    email: string;
    resetLink: string;
    password: string;
}
export declare class LoginDto {
    email: string;
    password: string;
}
export declare class verifyTeacherOtpDto {
    otp: string;
    email: string;
}
export declare class resendTeacherOtpDto {
    email: string;
}
