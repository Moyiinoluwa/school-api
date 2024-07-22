import { StudentService } from './student.service';
import { CreateStudentDto, UpdateStudentDto } from './student.dto';
import { ChangePasswordDto, LoginDto, ResendOtpDto, ResetPassword, ResetPasswordLinkDto, VerifyOtpDto } from 'src/common/common.dto';
export declare class StudentController {
    private studentService;
    constructor(studentService: StudentService);
    CreateStudent(dto: CreateStudentDto): Promise<{
        message: string;
    }>;
    login(dto: LoginDto): Promise<{
        accesstoken: string;
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
    updateProfile(dto: UpdateStudentDto, id: number): Promise<{
        message: string;
    }>;
    changePassword(id: number, dto: ChangePasswordDto): Promise<{
        message: string;
    }>;
    allStudent(): Promise<import("../Entity/student.entity").StudentEntity[]>;
    oneStudent(id: number): Promise<import("../Entity/student.entity").StudentEntity>;
    deleteStudent(id: number): Promise<{
        message: string;
    }>;
}
