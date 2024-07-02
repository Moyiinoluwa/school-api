import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TeacherEntity } from "src/Entity/teacher.entity";
import { Repository } from "typeorm";

@Injectable()
export class TeacherRepository extends Repository<TeacherEntity> {
    constructor(@InjectRepository(TeacherEntity) private readonly teacherRepository: TeacherRepository) {
        super(teacherRepository.target,
            teacherRepository.manager,
            teacherRepository.queryRunner
        )
    }
}