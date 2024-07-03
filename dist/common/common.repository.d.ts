import { AdminOtpEnitity } from "src/Entity/adminOtp.entity";
import { NotificationEntity } from "src/Entity/notification.entity";
import { StudentOtpEntity } from "src/Entity/otp.entity";
import { TeacherOtpEntity } from "src/Entity/teacherOtp.entity";
import { Repository } from "typeorm";
export declare class StudentOtpRepository extends Repository<StudentOtpEntity> {
    private readonly studentOtpRepository;
    constructor(studentOtpRepository: StudentOtpRepository);
}
export declare class NotificationRepository extends Repository<NotificationEntity> {
    private readonly notificationRepository;
    constructor(notificationRepository: NotificationRepository);
}
export declare class TeacherOtpRepository extends Repository<TeacherOtpEntity> {
    private readonly teacherOtpRepository;
    constructor(teacherOtpRepository: TeacherOtpRepository);
}
export declare class AdminOtpRepository extends Repository<AdminOtpEnitity> {
    private readonly adminOtpRepository;
    constructor(adminOtpRepository: AdminOtpRepository);
}
