import { CreateTeacherDto } from './teacher.dto';
import { TeacherService } from './teacher.service';
import { resendTeacherOtpDto, verifyTeacherOtpDto } from 'src/common/common.dto';
export declare class TeacherController {
    private teacherService;
    constructor(teacherService: TeacherService);
    register(dto: CreateTeacherDto): Promise<{
        message: string;
    }>;
    verifyCode(dto: verifyTeacherOtpDto): Promise<{
        isValid: boolean;
    }>;
    resendCode(dto: resendTeacherOtpDto): Promise<{
        message: string;
    }>;
}
