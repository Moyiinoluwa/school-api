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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const admin_entity_1 = require("../Entity/admin.entity");
const student_entity_1 = require("../Entity/student.entity");
const teacher_entity_1 = require("../Entity/teacher.entity");
const admin_repository_1 = require("../admin/admin.repository");
const student_repository_1 = require("../student/student.repository");
const teacher_repository_1 = require("../teacher/teacher.repository");
let AuthService = class AuthService {
    constructor(adminRepository, studentRepository, teacherRepository) {
        this.adminRepository = adminRepository;
        this.studentRepository = studentRepository;
        this.teacherRepository = teacherRepository;
    }
    async valiadteByIdAndRole(id, role) {
        switch (role) {
            case 'admin':
                return this.adminRepository.findOne({ where: { id } });
            case 'student':
                return this.studentRepository.findOne({ where: { id } });
            case 'teacher':
                return this.teacherRepository.findOne({ where: { id } });
            default:
                return null;
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(admin_entity_1.AdminEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(student_entity_1.StudentEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(teacher_entity_1.TeacherEntity)),
    __metadata("design:paramtypes", [admin_repository_1.AdminRepository,
        student_repository_1.StudentRepository,
        teacher_repository_1.TeacherRepository])
], AuthService);
//# sourceMappingURL=auth.service.js.map