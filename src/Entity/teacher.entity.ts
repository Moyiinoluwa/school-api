import { Role } from "src/Enum/general.enum";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { StudentEntity } from "./student.entity";
import { AssignmentEntity } from "./assignment.entity";
import { MessageEntity } from "./message.entity";

export interface ITeacher {
  fullname: string;
  username: string;
  qualification: string;
  email: string;
  password: string;
  id: number;
  createdAt: Date;
  isActive: boolean;
  isRegistered: boolean;
  isLoggedIn: boolean;
  isLoggedOut: boolean;
  isVerified: boolean;
  resetLink: string;
  isResetLinkSent: boolean;
  resetPasswordLinkExpiration: Date;
  role: Role;
  loginCount: number;
  isLocked: boolean;
  locked_until: Date;
  profilePicture: string;
}

@Entity({ name: 'teacher' })
export class TeacherEntity implements ITeacher {
  @PrimaryGeneratedColumn()
  id: number;

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

  @CreateDateColumn({ nullable: false })
  createdAt: Date;

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: false, default: false })
  isVerified: boolean;

  @Column({ default: false, nullable: false })
  isRegistered: boolean;

  @Column({ nullable: false, default: false })
  isLoggedIn: boolean;

  @Column({ default: false, nullable: false })
  isLoggedOut: boolean;

  @Column({ nullable: true })
  resetLink: string;

  @Column({ nullable: false, default: false })
  isResetLinkSent: boolean;

  @Column({ nullable: true })
  resetPasswordLinkExpiration: Date;

  @Column({ nullable: false, type: 'enum', enum: Role, default: Role.TEACHER })
  role: Role;

  @Column({ nullable: false, default: 0 })
  loginCount: number;

  @Column({ nullable: true })
  isLocked: boolean;

  @Column({ nullable: true })
  locked_until: Date;

  @Column({ nullable: true })
  profilePicture: string;

  @OneToMany(() => StudentEntity, student => student.teacher)
  student: StudentEntity[];

  @OneToMany(() => AssignmentEntity, assignment => assignment.teacher)
  assignment: AssignmentEntity[];

  @OneToMany(() => MessageEntity, message => message.sender)
  sentMessages: MessageEntity[];

  @OneToMany(() => MessageEntity, message => message.receiver)
  receivedMessages: MessageEntity[];
}
