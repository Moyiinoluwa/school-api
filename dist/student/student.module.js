"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentModule = void 0;
const common_1 = require("@nestjs/common");
const student_controller_1 = require("./student.controller");
const typeorm_1 = require("@nestjs/typeorm");
const student_service_1 = require("./student.service");
const student_repository_1 = require("./student.repository");
const student_entity_1 = require("../Entity/student.entity");
const common_repository_1 = require("../common/common.repository");
const otp_entity_1 = require("../Entity/otp.entity");
const mailer_service_1 = require("../Mailer/mailer.service");
const notification_entity_1 = require("../Entity/notification.entity");
let StudentModule = class StudentModule {
};
exports.StudentModule = StudentModule;
exports.StudentModule = StudentModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([student_entity_1.StudentEntity, otp_entity_1.StudentOtpEntity, notification_entity_1.NotificationEntity])],
        controllers: [student_controller_1.StudentController],
        providers: [student_service_1.StudentService, student_repository_1.StudentRepository, common_repository_1.StudentOtpRepository, mailer_service_1.Mailer, common_repository_1.NotificationRepository],
    })
], StudentModule);
//# sourceMappingURL=student.module.js.map