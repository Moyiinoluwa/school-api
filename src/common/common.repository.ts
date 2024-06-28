import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { NotificationEntity } from "src/Entity/notification.entity";
import { StudentOtpEntity } from "src/Entity/otp.entity";
import { Repository } from "typeorm";


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

