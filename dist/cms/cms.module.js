"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CmsModule = void 0;
const common_1 = require("@nestjs/common");
const cms_controller_1 = require("./cms.controller");
const cms_service_1 = require("./cms.service");
const student_repository_1 = require("../student/student.repository");
const typeorm_1 = require("@nestjs/typeorm");
const student_entity_1 = require("../Entity/student.entity");
const upload_service_1 = require("../Helpers/upload.service");
const teacher_repository_1 = require("../teacher/teacher.repository");
const cms_repository_1 = require("./cms.repository");
const teacher_entity_1 = require("../Entity/teacher.entity");
const message_entity_1 = require("../Entity/message.entity");
const assignment_entity_1 = require("../Entity/assignment.entity");
let CmsModule = class CmsModule {
};
exports.CmsModule = CmsModule;
exports.CmsModule = CmsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([student_entity_1.StudentEntity, teacher_entity_1.TeacherEntity, message_entity_1.MessageEntity, assignment_entity_1.AssignmentEntity])],
        controllers: [cms_controller_1.CmsController],
        providers: [cms_service_1.CmsService, student_repository_1.StudentRepository, upload_service_1.UploadService, teacher_repository_1.TeacherRepository, cms_repository_1.MessageRepository, cms_repository_1.AssignmentRepository]
    })
], CmsModule);
//# sourceMappingURL=cms.module.js.map