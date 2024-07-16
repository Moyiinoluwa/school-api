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
exports.AssignmentRepository = exports.MessageRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const assignment_entity_1 = require("../Entity/assignment.entity");
const message_entity_1 = require("../Entity/message.entity");
const typeorm_2 = require("typeorm");
let MessageRepository = class MessageRepository extends typeorm_2.Repository {
    constructor(messageRepository) {
        super(messageRepository.target, messageRepository.manager, messageRepository.queryRunner);
        this.messageRepository = messageRepository;
    }
};
exports.MessageRepository = MessageRepository;
exports.MessageRepository = MessageRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(message_entity_1.MessageEntity)),
    __metadata("design:paramtypes", [MessageRepository])
], MessageRepository);
let AssignmentRepository = class AssignmentRepository extends typeorm_2.Repository {
    constructor(assignmentRepository) {
        super(assignmentRepository.target, assignmentRepository.manager, assignmentRepository.queryRunner);
        this.assignmentRepository = assignmentRepository;
    }
};
exports.AssignmentRepository = AssignmentRepository;
exports.AssignmentRepository = AssignmentRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(assignment_entity_1.AssignmentEntity)),
    __metadata("design:paramtypes", [AssignmentRepository])
], AssignmentRepository);
//# sourceMappingURL=cms.repository.js.map