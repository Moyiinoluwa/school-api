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
exports.UpdateTeacherDto = exports.CreateTeacherDto = void 0;
const class_validator_1 = require("class-validator");
class CreateTeacherDto {
}
exports.CreateTeacherDto = CreateTeacherDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'fullname is required' }),
    __metadata("design:type", String)
], CreateTeacherDto.prototype, "fullname", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'username is required' }),
    __metadata("design:type", String)
], CreateTeacherDto.prototype, "username", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'qualification is required' }),
    __metadata("design:type", String)
], CreateTeacherDto.prototype, "qualification", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'email is required' }),
    (0, class_validator_1.IsEmail)({}, { message: 'invalid email address' }),
    __metadata("design:type", String)
], CreateTeacherDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'password is required' }),
    (0, class_validator_1.IsStrongPassword)({
        minLength: 8,
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        minUppercase: 1
    }),
    __metadata("design:type", String)
], CreateTeacherDto.prototype, "password", void 0);
class UpdateTeacherDto {
}
exports.UpdateTeacherDto = UpdateTeacherDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateTeacherDto.prototype, "fullname", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateTeacherDto.prototype, "username", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateTeacherDto.prototype, "qualification", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], UpdateTeacherDto.prototype, "email", void 0);
//# sourceMappingURL=teacher.dto.js.map