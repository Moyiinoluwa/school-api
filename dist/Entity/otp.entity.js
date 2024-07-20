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
exports.StudentOtpEntity = void 0;
const typeorm_1 = require("typeorm");
const student_entity_1 = require("./student.entity");
let StudentOtpEntity = class StudentOtpEntity {
};
exports.StudentOtpEntity = StudentOtpEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], StudentOtpEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], StudentOtpEntity.prototype, "otp", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], StudentOtpEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: 'false' }),
    __metadata("design:type", Boolean)
], StudentOtpEntity.prototype, "verified", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], StudentOtpEntity.prototype, "expirationTime", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'date', nullable: false }),
    __metadata("design:type", Date)
], StudentOtpEntity.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => student_entity_1.StudentEntity, (student) => student.studentOtp),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", student_entity_1.StudentEntity)
], StudentOtpEntity.prototype, "student", void 0);
exports.StudentOtpEntity = StudentOtpEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'studentOtp' })
], StudentOtpEntity);
//# sourceMappingURL=otp.entity.js.map