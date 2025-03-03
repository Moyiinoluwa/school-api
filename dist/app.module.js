"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const student_module_1 = require("./student/student.module");
const common_module_1 = require("./common/common.module");
const config_1 = require("@nestjs/config");
const mailer_1 = require("@nestjs-modules/mailer");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_service_1 = require("./typeorm/typeorm.service");
const teacher_module_1 = require("./teacher/teacher.module");
const admin_module_1 = require("./admin/admin.module");
const cms_module_1 = require("./cms/cms.module");
const auth_module_1 = require("./auth/auth.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            student_module_1.StudentModule,
            typeorm_1.TypeOrmModule.forRootAsync({ useClass: typeorm_service_1.TypeormService }),
            common_module_1.CommonModule,
            config_1.ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
            mailer_1.MailerModule.forRoot({
                transport: {
                    service: 'gmail',
                    host: 'smtp.gmail.com',
                    port: 587,
                    secure: false,
                    auth: {
                        user: process.env.AUTH_EMAIL,
                        pass: process.env.AUTH_PASSWORD
                    },
                },
            }),
            teacher_module_1.TeacherModule,
            admin_module_1.AdminModule,
            cms_module_1.CmsModule,
            auth_module_1.AuthModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map