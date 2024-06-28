// import { StudentEntity } from "src/Entity/student.entity";
// import { EntityRepository, Repository } from "typeorm";


// @EntityRepository(StudentEntity)
// export class StudentRepository extends Repository<StudentEntity> {}


import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { StudentEntity } from "src/Entity/student.entity";
import { Repository } from "typeorm";

@Injectable()
export class StudentRepository extends Repository<StudentEntity> {
    constructor(@InjectRepository(StudentEntity) private studentRepository: Repository<StudentEntity> ) {
        super(
            studentRepository.target,
            studentRepository.manager,
            studentRepository.queryRunner
        )
    }
  
}
