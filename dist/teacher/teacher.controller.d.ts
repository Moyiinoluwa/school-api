import { CreateTeacherDto, UpdateTeacherDto } from './teacher.dto';
import { TeacherService } from './teacher.service';
import { ChangeApassword, LoginDto, ResetDto, resendTeacherOtpDto, resetTeacherPasswordDto, verifyTeacherOtpDto } from 'src/common/common.dto';
export declare class TeacherController {
    private teacherService;
    constructor(teacherService: TeacherService);
    register(dto: CreateTeacherDto): Promise<{
        message: string;
    }>;
    verifyCode(dto: verifyTeacherOtpDto): Promise<{
        message: string;
    }>;
    resendCode(dto: resendTeacherOtpDto): Promise<{
        message: string;
    }>;
    resetPasswordLink(dto: ResetDto): Promise<{
        message: string;
    }>;
    resetPassword(dto: resetTeacherPasswordDto): Promise<{
        message: string;
    }>;
    updateTeacher(id: number, dto: UpdateTeacherDto): Promise<{
        message: string;
    }>;
    login(dto: LoginDto): Promise<{
        accessToken: string;
    }>;
    changePassword(id: number, dto: ChangeApassword): Promise<{
        message: string;
    }>;
    getAll(): Promise<import("../Entity/teacher.entity").TeacherEntity[]>;
    getOne(id: number): Promise<import("../Entity/teacher.entity").TeacherEntity>;
}
