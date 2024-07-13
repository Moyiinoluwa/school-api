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
export declare class ResetDto {
    email: string;
}
export declare class resetTeacherPasswordDto {
    email: string;
    resetLink: string;
    password: string;
}
export declare class VerifyAdminOtp {
    email: string;
    otp: string;
}
export declare class ResendAdminOtpDto {
    email: string;
}
export declare class ResetAdminPasswordLink {
    email: string;
}
export declare class ResetAdminPassword {
    email: string;
    resetLink: string;
    password: string;
}
export declare class ChangePasswordDto {
    oldPassword: string;
    newPassword: string;
}
