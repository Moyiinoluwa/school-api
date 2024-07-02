import { TeacherRepository } from './teacher.repository';
import { CreateTeacherDto } from './teacher.dto';
import { TeacherOtpRepository } from 'src/common/common.repository';
import { Mailer } from 'src/Mailer/mailer.service';
import { resendTeacherOtpDto, verifyTeacherOtpDto } from 'src/common/common.dto';
export declare class TeacherService {
    private readonly teacherRepository;
    private readonly teacherOtpRepository;
    private readonly mailer;
    constructor(teacherRepository: TeacherRepository, teacherOtpRepository: TeacherOtpRepository, mailer: Mailer);
    hashPassword(password: any): Promise<string>;
    createCode(): Promise<string>;
    createTeacher(dto: CreateTeacherDto): Promise<{
        message: string;
    }>;
    verifyCode(dto: verifyTeacherOtpDto): Promise<{
        isValid: boolean;
    }>;
    resendCode(dto: resendTeacherOtpDto): Promise<{
        message: string;
    }>;
}
