export interface ITeacher {
    fullname: string;
    username: string;
    qualification: string;
    email: string;
    password: string;
    id: string;
}
export declare class TeacherEntity implements ITeacher {
    id: string;
    fullname: string;
    username: string;
    qualification: string;
    email: string;
    password: string;
    createdAt: Date;
    isActive: true;
    isVerified: boolean;
    isRegistered: boolean;
    iSLoggedIn: boolean;
    isLoggedOut: boolean;
}
