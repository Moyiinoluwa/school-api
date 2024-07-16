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
exports.CmsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const student_repository_1 = require("../student/student.repository");
const teacher_repository_1 = require("../teacher/teacher.repository");
const cms_repository_1 = require("./cms.repository");
const message_entity_1 = require("../Entity/message.entity");
const upload_service_1 = require("../Helpers/upload.service");
let CmsService = class CmsService {
    constructor(studentRepository, teacherRepository, messageRepository, assignmentRepository, uploadService) {
        this.studentRepository = studentRepository;
        this.teacherRepository = teacherRepository;
        this.messageRepository = messageRepository;
        this.assignmentRepository = assignmentRepository;
        this.uploadService = uploadService;
    }
    async uploadProfilePicture(id, file) {
        const student = await this.studentRepository.findOne({ where: { id } });
        if (!student) {
            throw new common_1.HttpException('Student not found', common_1.HttpStatus.NOT_FOUND);
        }
        const filename = await this.uploadService.uploadFile(file);
        student.profilePicture = filename;
        await this.studentRepository.save(student);
        return { message: 'Profile picture uploaded' };
    }
    async viewStudentScore(id, subject) {
        const student = await this.studentRepository.findOne({ where: { id } });
        if (!student) {
            throw new common_1.HttpException('student cannot view score', common_1.HttpStatus.NOT_FOUND);
        }
        const score = student.score[subject];
        if (score === undefined) {
            throw new common_1.HttpException(`Score for ${subject} not set`, common_1.HttpStatus.NOT_FOUND);
        }
        return score;
    }
    async messageTeacher(sender_id, reciever_id, message) {
        const student = await this.studentRepository.findOne({ where: { id: sender_id } });
        if (!student) {
            throw new common_1.HttpException('student cannot text teacher', common_1.HttpStatus.NOT_FOUND);
        }
        const teacher = await this.teacherRepository.findOne({ where: { id: reciever_id } });
        if (!teacher) {
            throw new common_1.HttpException('teacher not permitted to text student', common_1.HttpStatus.NOT_FOUND);
        }
        const text = new message_entity_1.MessageEntity();
        text.sender_id = student.username;
        text.reciever_id = teacher.username;
        text.date = new Date();
        text.message = message;
        await this.messageRepository.save(text);
        return { message: 'Message sent to teacher' };
    }
    async studentToStudent(sender_id, reciever_id, message) {
        const student = await this.studentRepository.findOne({ where: { id: sender_id } });
        if (!student) {
            throw new common_1.HttpException('student cannot send message', common_1.HttpStatus.NOT_FOUND);
        }
        const aStudent = await this.studentRepository.findOne({ where: { id: reciever_id } });
        if (!aStudent) {
            throw new common_1.HttpException('student cannot recieve message', common_1.HttpStatus.NOT_FOUND);
        }
        const gist = new message_entity_1.MessageEntity();
        gist.reciever_id = aStudent.username;
        gist.sender_id = student.username;
        gist.date = new Date();
        gist.message = message;
        await this.messageRepository.save(gist);
        return { message: 'Message sent to the other student' };
    }
    async uploadAnswer(id, file) {
        const student = await this.studentRepository.findOne({ where: { id } });
        if (!student) {
            throw new common_1.BadRequestException('Student cannot upload assignment');
        }
        const filename = await this.uploadService.uploadFile(file);
        student.answer = filename;
        await this.studentRepository.save(student);
        return { message: 'Answer uploaded successfully' };
    }
    async uploadTeacherPicture(id, file) {
        const teacher = await this.teacherRepository.findOne({ where: { id } });
        if (!teacher) {
            throw new common_1.BadRequestException('Teacher cannot upload teacher');
        }
        const filename = await this.uploadService.uploadFile(file);
        teacher.profilePicture = filename;
        await this.teacherRepository.save(teacher);
        return { message: 'Profile picture uploaded' };
    }
    async uploadAssignment(teacher_id, student_id, file) {
        const teacher = await this.teacherRepository.findOne({ where: { id: teacher_id } });
        if (!teacher) {
            throw new common_1.BadRequestException('teacher cannot upload assignment');
        }
        const student = await this.studentRepository.findOne({ where: { id: student_id } });
        if (!student) {
            throw new common_1.BadRequestException('student cannot download assignment from teacher');
        }
        const assigment = await this.uploadService.uploadFile(file);
        student.assignment = assigment;
        await this.studentRepository.save(student);
        return { message: 'Assignment sent to student' };
    }
    async studentScore(teacher_id, student_id, assign_id, dto) {
        const teacher = await this.teacherRepository.findOne({ where: { id: teacher_id } });
        if (!teacher) {
            throw new common_1.BadRequestException('teacher cannot send score');
        }
        const student = await this.studentRepository.findOne({ where: { id: student_id } });
        if (!student) {
            throw new common_1.BadRequestException('student cannot get score');
        }
        const assigment = await this.assignmentRepository.findOne({ where: { id: assign_id } });
        if (!assigment) {
            throw new common_1.BadRequestException('Cannot find assignment');
        }
        student.score = dto.score;
        return { message: 'Student score recorded' };
    }
};
exports.CmsService = CmsService;
exports.CmsService = CmsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(student_repository_1.StudentRepository)),
    __param(1, (0, typeorm_1.InjectRepository)(teacher_repository_1.TeacherRepository)),
    __param(2, (0, typeorm_1.InjectRepository)(cms_repository_1.MessageRepository)),
    __param(3, (0, typeorm_1.InjectRepository)(cms_repository_1.AssignmentRepository)),
    __metadata("design:paramtypes", [student_repository_1.StudentRepository,
        teacher_repository_1.TeacherRepository,
        cms_repository_1.MessageRepository,
        cms_repository_1.AssignmentRepository,
        upload_service_1.UploadService])
], CmsService);
//# sourceMappingURL=cms.service.js.map