import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TeacherEntity } from "./teacher.entity";
import { StudentEntity } from "./student.entity";

export interface IMessage {
  senderId: number;
  receiverId: number;
  message: string;
  id: number;
  date: Date;
}

@Entity({ name: 'message' })
export class MessageEntity implements IMessage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  senderId: number;

  @Column({ nullable: true })
  receiverId: number;

  @Column({ nullable: false })
  message: string;
  
  @CreateDateColumn({ nullable: false })
  date: Date;

  @ManyToOne(() => TeacherEntity, teacher => teacher.sentMessages)
  sender: TeacherEntity;

  @ManyToOne(() => TeacherEntity, teacher => teacher.receivedMessages)
  receiver: TeacherEntity;

  @ManyToOne(() => StudentEntity, student => student.senders)
  senders: StudentEntity[]

  @ManyToOne(() => StudentEntity, student => student.receivers)
  receivers: StudentEntity[]
}
