/// <reference types="multer" />
import { CmsService } from './cms.service';
import { StudentScoreDto } from './cms.dto';
export declare class CmsController {
    private cmsService;
    constructor(cmsService: CmsService);
    uploadProfilePicture(id: string, file: Express.Multer.File): Promise<{
        message: string;
    }>;
    viewStudentScore(id: string, subject: string): Promise<number>;
    sendTeacherMessage(sender_id: string, reciever_id: string, message: string): Promise<{
        message: string;
    }>;
    sendStudentMessage(sender_id: string, reciever_id: string, message: string): Promise<{
        message: string;
    }>;
    uploadAnswer(id: string, file: Express.Multer.File): Promise<{
        message: string;
    }>;
    uploadTeacherPicture(id: string, file: Express.Multer.File): Promise<{
        message: string;
    }>;
    sendAssignment(teacher_id: string, student_id: string, file: Express.Multer.File): Promise<{
        message: string;
    }>;
    setScore(teacher_id: string, student_id: string, assign_id: string, dto: StudentScoreDto): Promise<{
        message: string;
    }>;
}
