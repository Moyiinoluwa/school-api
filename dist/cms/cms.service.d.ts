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
    uploadProfilePicture(id: number, file: Express.Multer.File): Promise<{
        message: string;
    }>;
    viewStudentScore(id: number, subject: string): Promise<number>;
    messageTeacher(sender_id: number, reciever_id: number, message: string): Promise<{
        message: string;
    }>;
    studentToStudent(sender_id: number, reciever_id: number, message: string): Promise<{
        message: string;
    }>;
    uploadAnswer(id: number, file: Express.Multer.File): Promise<{
        message: string;
    }>;
    uploadTeacherPicture(id: number, file: Express.Multer.File): Promise<{
        message: string;
    }>;
    uploadAssignment(teacher_id: number, student_id: number, file: Express.Multer.File): Promise<{
        message: string;
    }>;
    studentScore(teacher_id: number, student_id: number, assign_id: number, dto: StudentScoreDto): Promise<{
        message: string;
    }>;
    editScore(studentId: number, teacherid: number, assigmentId: number, dto: StudentScoreDto): Promise<{
        message: string;
    }>;
    messageStudent(teacherId: number, studentId: number, message: string): Promise<{
        message: string;
    }>;
    teacherToTeacher(teacherId: number, teaacherId: number, message: string): Promise<{
        message: string;
    }>;
}
