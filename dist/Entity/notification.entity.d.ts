export interface INotify {
    message: string;
    id: number;
    account: string;
    subject: string;
    date: Date;
}
export declare class NotificationEntity implements INotify {
    id: number;
    date: Date;
    account: string;
    subject: string;
    message: string;
}
