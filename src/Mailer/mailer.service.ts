import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";

@Injectable()
export class Mailer {
    constructor( private readonly mailerservice: MailerService) {}

    async sendVerificationMail(email: string, verificationCode: string, name: string ) {
        const subject = 'Email verification'
        const body = `<!DOCTYPE HTML>
        <html>
        <head>
        </head>
        <body>
        <h1>OTP Verification</h1>
        <h1>Hello ${name}</h1>
        <h1> Your One Time Password (OTP): ${verificationCode  }</h1>
        <P> This password is for a limited time</P>
        <p> If you did not request for OTP kindly ignore this message, your account is safe with us</p>
        </body>
        </html>
        `
        await this.mailerservice.sendMail({to:email, subject, html: body})
    }

    async resetPasswordMail(email: string, resetLink: string, name: string) {
        const subject = 'Password Reset'
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
        `
        await this.mailerservice.sendMail({to:email, subject, html: body})
    }

    //admin sends mail to teachers
    async adminToTeachers(email: string, username: string) {
        const subject = 'Important notice'
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
        `
        await this.mailerservice.sendMail({to: email, subject, html: body})
    }

    //admin sends mail to students
    async adminToStudent(email: string, name: string) {
        const subject = 'Important notice'
        const body = `<!DOCTYPE HTML>
        <html>
        <head>
        </head>
        <body>
        <h1>Announcemen</h1>
        <h1>Hello ${name}</h1>
        <h1> All student are to meet at the lobby at the end classes today.</h1>
        <P> Please note that attendance is complusory</P>
        <p> Management</p>
        </body>
        </html>
        `
        await this.mailerservice.sendMail({to: email, subject, html: body})
    }
}