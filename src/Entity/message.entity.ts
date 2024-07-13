import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

export  interface IMessage {
sender_id: string;
reciever_id: string;
message: string;
id: string;
date: Date;
}


@Entity({ name: 'message'})
    export class MessageEntity implements IMessage {
        @PrimaryGeneratedColumn('uuid')
        id: string;

        @Column({ nullable: false })
        sender_id: string;

        @Column({ nullable: false })
        reciever_id: string;

        @Column({ nullable: false })
        message: string;
        
        @CreateDateColumn({ nullable: false })
        date: Date;
    }
