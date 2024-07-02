import { TeacherEntity } from "src/Entity/teacher.entity";
import { Repository } from "typeorm";
export declare class TeacherRepository extends Repository<TeacherEntity> {
    private readonly teacherRepository;
    constructor(teacherRepository: TeacherRepository);
}
