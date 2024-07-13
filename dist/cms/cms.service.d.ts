import { StudentRepository } from 'src/student/student.repository';
import { TeacherRepository } from 'src/teacher/teacher.repository';
import { MessageRepository } from './cms.repository';
export declare class CmsService {
    private readonly studentRepository;
    private readonly teacherRepository;
    private readonly messageRepository;
    constructor(studentRepository: StudentRepository, teacherRepository: TeacherRepository, messageRepository: MessageRepository);
    uploadProfilePicture(id: string, filename: string): Promise<{
        message: string;
    }>;
    viewStudentScore(id: string, subject: string): Promise<number>;
    messageTeacher(sender_id: string, reciever_id: string, message: string): Promise<{
        message: string;
    }>;
    studentToStudent(sender_id: string, reciever_id: string, message: string): Promise<{
        message: string;
    }>;
}
