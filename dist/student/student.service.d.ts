import { StudentRepository } from './student.repository';
import { CreateStudentDto } from './student.dto';
import { NotificationRepository, StudentOtpRepository } from 'src/common/common.repository';
import { Mailer } from 'src/Mailer/mailer.service';
import { LoginDto, ResendOtpDto, ResetPassword, ResetPasswordLinkDto, VerifyOtpDto } from 'src/common/common.dto';
export declare class StudentService {
    private readonly studentRepository;
    private readonly studentOtpRepository;
    private readonly notificationRepository;
    private readonly mailer;
    constructor(studentRepository: StudentRepository, studentOtpRepository: StudentOtpRepository, notificationRepository: NotificationRepository, mailer: Mailer);
    hashPassword(password: any): Promise<string>;
    comparePassword(password: any, userpassword: any): Promise<boolean>;
    verificationCode(): Promise<string>;
    createStudent(dto: CreateStudentDto): Promise<{
        message: string;
    }>;
    verifyOtp(dto: VerifyOtpDto): Promise<{
        isValid: boolean;
    }>;
    ResendOtp(dto: ResendOtpDto): Promise<{
        message: string;
    }>;
    ResetPasswordLink(dto: ResetPasswordLinkDto): Promise<{
        message: string;
    }>;
    ResetPassword(dto: ResetPassword): Promise<{
        message: string;
    }>;
    login(dto: LoginDto): Promise<void>;
}
