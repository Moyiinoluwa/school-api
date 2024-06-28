import { NotificationEntity } from "src/Entity/notification.entity";
import { StudentOtpEntity } from "src/Entity/otp.entity";
import { Repository } from "typeorm";
export declare class StudentOtpRepository extends Repository<StudentOtpEntity> {
    private readonly studentOtpRepository;
    constructor(studentOtpRepository: StudentOtpRepository);
}
export declare class NotificationRepository extends Repository<NotificationEntity> {
    private readonly notificationRepository;
    constructor(notificationRepository: NotificationRepository);
}
