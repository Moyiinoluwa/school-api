import { StudentEntity } from "./student.entity";
import { TeacherEntity } from "./teacher.entity";
export interface IAssignment {
    studentId: number;
    teacherId: number;
    subject: string;
    score: number;
    id: number;
    date: Date;
    assignment: string;
}
export declare class AssignmentEntity implements IAssignment {
    id: number;
    subject: string;
    score: number;
    assignment: string;
    studentId: number;
    teacherId: number;
    date: Date;
    student: StudentEntity[];
    teacher: TeacherEntity[];
}
