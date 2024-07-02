"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeacherOtpRepository = exports.NotificationRepository = exports.StudentOtpRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const notification_entity_1 = require("../Entity/notification.entity");
const otp_entity_1 = require("../Entity/otp.entity");
const teacherOtp_entity_1 = require("../Entity/teacherOtp.entity");
const typeorm_2 = require("typeorm");
let StudentOtpRepository = class StudentOtpRepository extends typeorm_2.Repository {
    constructor(studentOtpRepository) {
        super(studentOtpRepository.target, studentOtpRepository.manager, studentOtpRepository.queryRunner);
        this.studentOtpRepository = studentOtpRepository;
    }
};
exports.StudentOtpRepository = StudentOtpRepository;
exports.StudentOtpRepository = StudentOtpRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(otp_entity_1.StudentOtpEntity)),
    __metadata("design:paramtypes", [StudentOtpRepository])
], StudentOtpRepository);
let NotificationRepository = class NotificationRepository extends typeorm_2.Repository {
    constructor(notificationRepository) {
        super(notificationRepository.target, notificationRepository.manager, notificationRepository.queryRunner);
        this.notificationRepository = notificationRepository;
    }
};
exports.NotificationRepository = NotificationRepository;
exports.NotificationRepository = NotificationRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(notification_entity_1.NotificationEntity)),
    __metadata("design:paramtypes", [NotificationRepository])
], NotificationRepository);
let TeacherOtpRepository = class TeacherOtpRepository extends typeorm_2.Repository {
    constructor(teacherOtpRepository) {
        super(teacherOtpRepository.target, teacherOtpRepository.manager, teacherOtpRepository.queryRunner);
        this.teacherOtpRepository = teacherOtpRepository;
    }
};
exports.TeacherOtpRepository = TeacherOtpRepository;
exports.TeacherOtpRepository = TeacherOtpRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(teacherOtp_entity_1.TeacherOtpEntity)),
    __metadata("design:paramtypes", [TeacherOtpRepository])
], TeacherOtpRepository);
//# sourceMappingURL=common.repository.js.map