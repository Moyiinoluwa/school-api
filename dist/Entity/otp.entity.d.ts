import { StudentEntity } from "./student.entity";
export interface IStudentOtp {
    id: number;
    otp: string;
    email: string;
    verified: boolean;
    date: Date;
    expirationTime: Date;
}
export declare class StudentOtpEntity implements IStudentOtp {
    id: number;
    otp: string;
    email: string;
    verified: boolean;
    expirationTime: Date;
    date: Date;
    student: StudentEntity;
}
