import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AdminEntity } from "src/Entity/admin.entity";
import { Repository } from "typeorm";

@Injectable()
export class AdminRepository extends Repository<AdminEntity> {
    constructor(@InjectRepository(AdminEntity) private readonly adminRepository: AdminRepository) {
        super( adminRepository.target,
            adminRepository.manager,
            adminRepository.queryRunner
        )
    }
}