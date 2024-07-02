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
exports.StudentEntity = void 0;
const general_enum_1 = require("../Enum/general.enum");
const typeorm_1 = require("typeorm");
let StudentEntity = class StudentEntity extends typeorm_1.BaseEntity {
};
exports.StudentEntity = StudentEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], StudentEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, unique: true }),
    __metadata("design:type", String)
], StudentEntity.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], StudentEntity.prototype, "surname", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], StudentEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, unique: true }),
    __metadata("design:type", String)
], StudentEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], StudentEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ nullable: false }),
    __metadata("design:type", Date)
], StudentEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], StudentEntity.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, default: false }),
    __metadata("design:type", Boolean)
], StudentEntity.prototype, "isLoggedIn", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, default: false }),
    __metadata("design:type", Boolean)
], StudentEntity.prototype, "isLoggedOut", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, default: false }),
    __metadata("design:type", Boolean)
], StudentEntity.prototype, "isVerified", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, default: false }),
    __metadata("design:type", Boolean)
], StudentEntity.prototype, "isRegistered", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, default: 0 }),
    __metadata("design:type", Number)
], StudentEntity.prototype, "loginCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Boolean)
], StudentEntity.prototype, "isLocked", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], StudentEntity.prototype, "locked_until", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], StudentEntity.prototype, "isResetLink", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], StudentEntity.prototype, "resetPasswordLinkExpirationTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, default: false }),
    __metadata("design:type", Boolean)
], StudentEntity.prototype, "isresetPasswordLinkSent", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, type: 'enum', enum: general_enum_1.Role, default: general_enum_1.Role.STUDENT }),
    __metadata("design:type", String)
], StudentEntity.prototype, "role", void 0);
exports.StudentEntity = StudentEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'student' })
], StudentEntity);
//# sourceMappingURL=student.entity.js.map