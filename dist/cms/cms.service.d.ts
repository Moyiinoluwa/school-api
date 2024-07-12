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
    messageTeacher(id: string): Promise<{
        message: string;
    }>;
}
