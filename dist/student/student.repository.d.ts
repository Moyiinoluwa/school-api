import { StudentEntity } from "src/Entity/student.entity";
import { Repository } from "typeorm";
export declare class StudentRepository extends Repository<StudentEntity> {
    private studentRepository;
    constructor(studentRepository: Repository<StudentEntity>);
}
