/// <reference types="multer" />
import { StudentRepository } from 'src/student/student.repository';
import { TeacherRepository } from 'src/teacher/teacher.repository';
import { AssignmentRepository, MessageRepository } from './cms.repository';
import { UploadService } from 'src/Helpers/upload.service';
import { StudentScoreDto } from './cms.dto';
export declare class CmsService {
    private readonly studentRepository;
    private readonly teacherRepository;
    private readonly messageRepository;
    private readonly assignmentRepository;
    private uploadService;
    constructor(studentRepository: StudentRepository, teacherRepository: TeacherRepository, messageRepository: MessageRepository, assignmentRepository: AssignmentRepository, uploadService: UploadService);
    uploadProfilePicture(id: string, file: Express.Multer.File): Promise<{
        message: string;
    }>;
    viewStudentScore(id: string, subject: string): Promise<number>;
    messageTeacher(sender_id: string, reciever_id: string, message: string): Promise<{
        message: string;
    }>;
    studentToStudent(sender_id: string, reciever_id: string, message: string): Promise<{
        message: string;
    }>;
    uploadAnswer(id: string, file: Express.Multer.File): Promise<{
        message: string;
    }>;
    uploadTeacherPicture(id: string, file: Express.Multer.File): Promise<{
        message: string;
    }>;
    uploadAssignment(teacher_id: string, student_id: string, file: Express.Multer.File): Promise<{
        message: string;
    }>;
    studentScore(teacher_id: string, student_id: string, assign_id: string, dto: StudentScoreDto): Promise<{
        message: string;
    }>;
}
