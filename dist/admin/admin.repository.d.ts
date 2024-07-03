import { AdminEntity } from "src/Entity/admin.entity";
import { Repository } from "typeorm";
export declare class AdminRepository extends Repository<AdminEntity> {
    private readonly adminRepository;
    constructor(adminRepository: AdminRepository);
}
