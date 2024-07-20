import { Role } from "src/Enum/general.enum";
import { BaseEntity } from "typeorm";
import { AssignmentEntity } from "./assignment.entity";
import { TeacherEntity } from "./teacher.entity";
import { MessageEntity } from "./message.entity";
export declare class StudentEntity extends BaseEntity {
    id: number;
    username: string;
    surname: string;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    isActive: boolean;
    isLoggedIn: boolean;
    isLoggedOut: boolean;
    isVerified: boolean;
    isRegistered: boolean;
    loginCount: number;
    isLocked: boolean;
    locked_until: Date;
    isResetLink: string;
    resetPasswordLinkExpirationTime: Date;
    isresetPasswordLinkSent: boolean;
    role: Role;
    profilePicture: string;
    score: number;
    answer: string;
    studentOtp: StudentEntity[];
    assignment: AssignmentEntity[];
    teacher: TeacherEntity[];
    senders: MessageEntity[];
    receivers: MessageEntity[];
}
