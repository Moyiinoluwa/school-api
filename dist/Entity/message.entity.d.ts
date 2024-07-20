import { TeacherEntity } from "./teacher.entity";
import { StudentEntity } from "./student.entity";
export interface IMessage {
    senderId: number;
    receiverId: number;
    message: string;
    id: number;
    date: Date;
}
export declare class MessageEntity implements IMessage {
    id: number;
    senderId: number;
    receiverId: number;
    message: string;
    date: Date;
    sender: TeacherEntity;
    receiver: TeacherEntity;
    senders: StudentEntity[];
    receivers: StudentEntity[];
}
