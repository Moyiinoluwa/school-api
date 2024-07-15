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
exports.TeacherEntity = void 0;
const general_enum_1 = require("../Enum/general.enum");
const typeorm_1 = require("typeorm");
let TeacherEntity = class TeacherEntity {
};
exports.TeacherEntity = TeacherEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], TeacherEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], TeacherEntity.prototype, "fullname", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, nullable: false }),
    __metadata("design:type", String)
], TeacherEntity.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], TeacherEntity.prototype, "qualification", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, nullable: false }),
    __metadata("design:type", String)
], TeacherEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], TeacherEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ nullable: false }),
    __metadata("design:type", Date)
], TeacherEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], TeacherEntity.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, default: false }),
    __metadata("design:type", Boolean)
], TeacherEntity.prototype, "isVerified", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false, nullable: false }),
    __metadata("design:type", Boolean)
], TeacherEntity.prototype, "isRegistered", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, default: false }),
    __metadata("design:type", Boolean)
], TeacherEntity.prototype, "isLoggedIn", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false, nullable: false }),
    __metadata("design:type", Boolean)
], TeacherEntity.prototype, "isLoggedOut", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], TeacherEntity.prototype, "resetLink", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, default: false }),
    __metadata("design:type", Boolean)
], TeacherEntity.prototype, "isResetLinkSent", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], TeacherEntity.prototype, "resetPasswordLinkExipration", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, type: 'enum', enum: general_enum_1.Role, default: general_enum_1.Role.TEACHER }),
    __metadata("design:type", String)
], TeacherEntity.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, default: 0 }),
    __metadata("design:type", Number)
], TeacherEntity.prototype, "loginCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Boolean)
], TeacherEntity.prototype, "isLocked", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], TeacherEntity.prototype, "locked_until", void 0);
exports.TeacherEntity = TeacherEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'teacher' })
], TeacherEntity);
//# sourceMappingURL=teacher.entity.js.map