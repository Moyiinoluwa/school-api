import { StudentRepository } from './student.repository';
import { CreateStudentDto, UpdateStudentDto } from './student.dto';
import { StudentEntity } from 'src/Entity/student.entity';
import { NotificationRepository, StudentOtpRepository } from 'src/common/common.repository';
import { Mailer } from 'src/Mailer/mailer.service';
import { ChangePasswordDto, LoginDto, ResendOtpDto, ResetPassword, ResetPasswordLinkDto, VerifyOtpDto } from 'src/common/common.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
export declare class StudentService {
    private readonly studentRepository;
    private readonly studentOtpRepository;
    private readonly notificationRepository;
    private readonly mailer;
    private jwt;
    private configService;
    constructor(studentRepository: StudentRepository, studentOtpRepository: StudentOtpRepository, notificationRepository: NotificationRepository, mailer: Mailer, jwt: JwtService, configService: ConfigService);
    hashPassword(password: any): Promise<string>;
    comparePassword(password: any, userpassword: any): Promise<boolean>;
    verificationCode(): Promise<string>;
    signToken(id: number, email: string, role: string): Promise<{
        accesstoken: string;
    }>;
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
    login(dto: LoginDto): Promise<{
        accesstoken: string;
    }>;
    changePassword(id: number, dto: ChangePasswordDto): Promise<{
        message: string;
    }>;
    updateProfile(dto: UpdateStudentDto, id: number): Promise<{
        message: string;
    }>;
    getAll(): Promise<StudentEntity[]>;
    getOneStudent(id: number): Promise<StudentEntity>;
}
