/// <reference types="multer" />
import { CmsService } from './cms.service';
import { StudentScoreDto } from './cms.dto';
export declare class CmsController {
    private cmsService;
    constructor(cmsService: CmsService);
    uploadProfilePicture(id: number, file: Express.Multer.File): Promise<{
        message: string;
    }>;
    viewStudentScore(id: number, subject: string): Promise<number>;
    sendTeacherMessage(sender_id: number, reciever_id: number, message: string): Promise<{
        message: string;
    }>;
    sendStudentMessage(sender_id: number, reciever_id: number, message: string): Promise<{
        message: string;
    }>;
    uploadAnswer(id: number, file: Express.Multer.File): Promise<{
        message: string;
    }>;
    uploadTeacherPicture(id: number, file: Express.Multer.File): Promise<{
        message: string;
    }>;
    sendAssignment(teacher_id: number, student_id: number, file: Express.Multer.File): Promise<{
        message: string;
    }>;
    setScore(teacher_id: number, student_id: number, assign_id: number, dto: StudentScoreDto): Promise<{
        message: string;
    }>;
    editScore(studentId: number, teacherId: number, assignmentId: number, dto: StudentScoreDto): Promise<{
        message: string;
    }>;
    messageStudent(teacherId: number, studentId: number, message: string): Promise<{
        message: string;
    }>;
    teacher(teacherId: number, teaacherId: number, message: string): Promise<{
        message: string;
    }>;
    getStudent(): Promise<import("../Entity/student.entity").StudentEntity[]>;
    getTeacher(): Promise<import("../Entity/teacher.entity").TeacherEntity[]>;
    sendMail(id: number): Promise<{
        message: string;
    }>;
    sendMailTeacher(id: number): Promise<{
        message: string;
    }>;
}
