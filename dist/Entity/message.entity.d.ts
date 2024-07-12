export interface IMessage {
    sender_id: string;
    reciever_id: string;
    message: string;
    id: string;
}
export declare class MessageEntity implements IMessage {
    id: string;
    sender_id: string;
    reciever_id: string;
    message: string;
}
