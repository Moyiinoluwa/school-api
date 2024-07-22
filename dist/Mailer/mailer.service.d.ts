import { MailerService } from "@nestjs-modules/mailer";
export declare class Mailer {
    private readonly mailerservice;
    constructor(mailerservice: MailerService);
    sendVerificationMail(email: string, verificationCode: string, name: string): Promise<void>;
    resetPasswordMail(email: string, resetLink: string, name: string): Promise<void>;
    adminToTeachers(email: string, username: string): Promise<void>;
    adminToStudent(email: string, name: string): Promise<void>;
}
