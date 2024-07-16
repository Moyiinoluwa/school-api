export interface IAssignment {
    studentId: string;
    teacherid: string;
    subject: string;
    score: number;
    id: string;
    date: Date;
}
export declare class AssignmentEntity implements IAssignment {
    id: string;
    subject: string;
    score: number;
    studentId: string;
    teacherid: string;
    date: Date;
}
