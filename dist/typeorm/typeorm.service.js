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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeormService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const admin_entity_1 = require("../Entity/admin.entity");
const adminOtp_entity_1 = require("../Entity/adminOtp.entity");
const message_entity_1 = require("../Entity/message.entity");
const notification_entity_1 = require("../Entity/notification.entity");
const otp_entity_1 = require("../Entity/otp.entity");
const student_entity_1 = require("../Entity/student.entity");
const teacher_entity_1 = require("../Entity/teacher.entity");
const teacherOtp_entity_1 = require("../Entity/teacherOtp.entity");
let TypeormService = class TypeormService {
    constructor(configservice) {
        this.configservice = configservice;
    }
    createTypeOrmOptions() {
        return {
            type: 'postgres',
            host: this.configservice.get('DATABASE_HOST'),
            port: this.configservice.get('DATABASE_PORT'),
            username: this.configservice.get('DATABASE_USER'),
            password: String(this.configservice.get('DATABASE_PASSWORD')),
            database: this.configservice.get('DATABASE_NAME'),
            entities: [student_entity_1.StudentEntity,
                otp_entity_1.StudentOtpEntity,
                notification_entity_1.NotificationEntity,
                teacher_entity_1.TeacherEntity,
                teacherOtp_entity_1.TeacherOtpEntity,
                admin_entity_1.AdminEntity,
                adminOtp_entity_1.AdminOtpEnitity,
                message_entity_1.MessageEntity
            ],
            synchronize: true
        };
    }
};
exports.TypeormService = TypeormService;
exports.TypeormService = TypeormService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], TypeormService);
//# sourceMappingURL=typeorm.service.js.map