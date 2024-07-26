import { AdminEntity } from 'src/Entity/admin.entity';
import { StudentEntity } from 'src/Entity/student.entity';
import { TeacherEntity } from 'src/Entity/teacher.entity';
import { AdminRepository } from 'src/admin/admin.repository';
import { StudentRepository } from 'src/student/student.repository';
import { TeacherRepository } from 'src/teacher/teacher.repository';
export declare class AuthService {
    private readonly adminRepository;
    private readonly studentRepository;
    private readonly teacherRepository;
    constructor(adminRepository: AdminRepository, studentRepository: StudentRepository, teacherRepository: TeacherRepository);
    valiadteByIdAndRole(id: number, role: string): Promise<AdminEntity | StudentEntity | TeacherEntity>;
}
