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
exports.Mailer = void 0;
const mailer_1 = require("@nestjs-modules/mailer");
const common_1 = require("@nestjs/common");
let Mailer = class Mailer {
    constructor(mailerservice) {
        this.mailerservice = mailerservice;
    }
    async sendVerificationMail(email, verificationCode, name) {
        const subject = 'Email verification';
        const body = `<!DOCTYPE HTML>
        <html>
        <head>
        </head>
        <body>
        <h1>OTP Verification</h1>
        <h1>Hello ${name}</h1>
        <h1> Your One Time Password (OTP): ${verificationCode}</h1>
        <P> This password is for a limited time</P>
        <p> If you did not request for OTP kindly ignore this message, your account is safe with us</p>
        </body>
        </html>
        `;
        await this.mailerservice.sendMail({ to: email, subject, html: body });
    }
    async resetPasswordMail(email, resetLink, name) {
        const subject = 'Password Reset';
        const body = `<!DOCTYPE HTML>
        <html>
        <head>
        </head>
        <body>
        <h1>Reset password link</h1>
        <h1>Hello ${name}</h1>
        <h1> Your Reset password link is: ${resetLink}</h1>
        <P> This Link is for a limited time</P>
        <p> If you did not request for a reset password link kindly ignore this message, your account is safe with us</p>
        </body>
        </html>
        `;
        await this.mailerservice.sendMail({ to: email, subject, html: body });
    }
    async adminToTeachers(email, username) {
        const subject = 'Important notice';
        const body = `<!DOCTYPE HTML>
        <html>
        <head>
        </head>
        <body>
        <h1>Announcemen</h1>
        <h1>Hello ${username}</h1>
        <h1> This is to remind you of the teachers' forum meeting on thurday, by 3pm</h1>
        <P> Please note that attendance is complusory</P>
        <p> Management</p>
        </body>
        </html>
        `;
        await this.mailerservice.sendMail({ to: email, subject, html: body });
    }
    async adminToStudent(email, name) {
        const subject = 'Important notice';
        const body = `<!DOCTYPE HTML>
        <html>
        <head>
        </head>
        <body>
        <h1>Announcemen</h1>
        <h1>Hello ${name}</h1>
        <h1> All student are to meet at lobby at the end classes today.</h1>
        <P> Please note that attendance is complusory</P>
        <p> Management</p>
        </body>
        </html>
        `;
        await this.mailerservice.sendMail({ to: email, subject, html: body });
    }
};
exports.Mailer = Mailer;
exports.Mailer = Mailer = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_1.MailerService])
], Mailer);
//# sourceMappingURL=mailer.service.js.map