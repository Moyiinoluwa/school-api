import { StudentService } from './student.service';
import { CreateStudentDto } from './student.dto';
import { LoginDto, ResendOtpDto, ResetPassword, ResetPasswordLinkDto, VerifyOtpDto } from 'src/common/common.dto';
export declare class StudentController {
    private studentService;
    constructor(studentService: StudentService);
    CreateStudent(dto: CreateStudentDto): Promise<{
        message: string;
    }>;
    VerifyOtpDto(dto: VerifyOtpDto): Promise<{
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
    login(dto: LoginDto): Promise<{
        accesstoken: string;
    }>;
}
