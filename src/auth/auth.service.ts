import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminEntity } from 'src/Entity/admin.entity';
import { StudentEntity } from 'src/Entity/student.entity';
import { TeacherEntity } from 'src/Entity/teacher.entity';
import { AdminRepository } from 'src/admin/admin.repository';
import { StudentRepository } from 'src/student/student.repository';
import { TeacherRepository } from 'src/teacher/teacher.repository';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(AdminEntity) private readonly adminRepository: AdminRepository,
        @InjectRepository(StudentEntity) private readonly studentRepository: StudentRepository,
        @InjectRepository(TeacherEntity) private readonly teacherRepository: TeacherRepository
    ) { }

    async valiadteByIdAndRole(id: number, role: string) {
        switch (role) {
            case 'admin':
                return this.adminRepository.findOne({ where: { id } })

            case 'student':
                return this.studentRepository.findOne({ where: { id } })

            case 'teacher':
                return this.teacherRepository.findOne({ where: { id } })

            default:
                return null
        }
    }
}
