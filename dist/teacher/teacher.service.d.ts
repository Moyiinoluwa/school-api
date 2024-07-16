import { TeacherRepository } from './teacher.repository';
import { CreateTeacherDto, UpdateTeacherDto } from './teacher.dto';
import { TeacherEntity } from 'src/Entity/teacher.entity';
import { TeacherOtpRepository } from 'src/common/common.repository';
import { Mailer } from 'src/Mailer/mailer.service';
import { ChangeApassword, LoginDto, ResetDto, resendTeacherOtpDto, resetTeacherPasswordDto, verifyTeacherOtpDto } from 'src/common/common.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
export declare class TeacherService {
    private readonly teacherRepository;
    private readonly teacherOtpRepository;
    private readonly mailer;
    private jwt;
    private configService;
    constructor(teacherRepository: TeacherRepository, teacherOtpRepository: TeacherOtpRepository, mailer: Mailer, jwt: JwtService, configService: ConfigService);
    hashPassword(password: any): Promise<string>;
    comparePassword(password: any, userpassword: any): Promise<boolean>;
    createCode(): Promise<string>;
    signToken(id: string, email: string, role: string): Promise<{
        accessToken: string;
    }>;
    createTeacher(dto: CreateTeacherDto): Promise<{
        message: string;
    }>;
    verifyCode(dto: verifyTeacherOtpDto): Promise<{
        message: string;
    }>;
    resendCode(dto: resendTeacherOtpDto): Promise<{
        message: string;
    }>;
    resetTeacherPasswordLink(dto: ResetDto): Promise<{
        message: string;
    }>;
    resetTeacherPassword(dto: resetTeacherPasswordDto): Promise<{
        message: string;
    }>;
    loginTeacher(dto: LoginDto): Promise<{
        accessToken: string;
    }>;
    updateTeacher(id: string, dto: UpdateTeacherDto): Promise<{
        message: string;
    }>;
    changeTeacherPassword(id: string, dto: ChangeApassword): Promise<{
        message: string;
    }>;
    getTeachers(): Promise<TeacherEntity[]>;
    getTeacher(id: string): Promise<TeacherEntity>;
}
