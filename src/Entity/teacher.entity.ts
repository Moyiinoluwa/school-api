import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

export interface ITeacher {
    fullname: string;
    username: string;
    qualification: string;
    email: string;
    password: string
    id: string
}
    @Entity({ name: 'teacher'})
export class TeacherEntity implements ITeacher {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false })
    fullname: string;

    @Column({ unique: true, nullable: false })
    username: string;

    @Column({ nullable: false })
    qualification: string;

    @Column({ unique: true, nullable: false })
    email: string;

    @Column({ nullable: false })
    password: string;

    @CreateDateColumn({ nullable: false})
    createdAt: Date;

    @Column({ default: true })
    isActive: true

    @Column({ nullable: false, default: false })
    isVerified: boolean

    @Column({ default: false, nullable: false})
    isRegistered: boolean

    @Column({ nullable: false, default: false})
    iSLoggedIn: boolean

    @Column({ default: false, nullable: false})
    isLoggedOut: boolean

    //@Column({ nullable: false}) 

}