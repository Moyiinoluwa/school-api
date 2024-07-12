import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AdminOtpEnitity } from "src/Entity/adminOtp.entity";
import { NotificationEntity } from "src/Entity/notification.entity";
import { StudentOtpEntity } from "src/Entity/otp.entity";
import { TeacherOtpEntity } from "src/Entity/teacherOtp.entity";
import { Repository } from "typeorm";

//student otp
@Injectable()
export class StudentOtpRepository extends Repository<StudentOtpEntity> {
    constructor(@InjectRepository(StudentOtpEntity) private readonly studentOtpRepository: StudentOtpRepository) {
        super(
            studentOtpRepository.target,
            studentOtpRepository.manager,
            studentOtpRepository.queryRunner
        )
    }

}

//notification
@Injectable()
    export class NotificationRepository extends Repository<NotificationEntity> {
        constructor(@InjectRepository(NotificationEntity) private readonly notificationRepository: NotificationRepository) {
            super(
                notificationRepository.target,
                notificationRepository.manager,
                notificationRepository.queryRunner
            )
        }
    }

    //teacher otp
    @Injectable()
    export class TeacherOtpRepository extends Repository<TeacherOtpEntity> {
        constructor(@InjectRepository(TeacherOtpEntity) private readonly teacherOtpRepository: TeacherOtpRepository) {
            super(teacherOtpRepository.target,
                teacherOtpRepository.manager,
                teacherOtpRepository.queryRunner
            )
        }
    }


    //admin otp
    @Injectable()
        export class AdminOtpRepository extends Repository<AdminOtpEnitity>  {
            constructor(@InjectRepository(AdminOtpEnitity) private readonly adminOtpRepository: AdminOtpRepository) {
                super(adminOtpRepository.target,
                    adminOtpRepository.manager,
                    adminOtpRepository.queryRunner
                )
            }
        }
     
    


