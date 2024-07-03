export interface IAdmin {
    id: string;
    fullname: string;
    email: string;
    password: string;
    username: string;
    createdAt: Date;
    isActive: true;
}
export declare class AdminEntity implements IAdmin {
    id: string;
    fullname: string;
    email: string;
    password: string;
    username: string;
    createdAt: Date;
    isActive: true;
}
