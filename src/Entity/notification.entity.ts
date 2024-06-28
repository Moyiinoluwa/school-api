import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

export interface INotify{
    message: string
    id: number
    account: string
    subject: string
    date: Date
}

@Entity({ name: 'notification'}) 
    export class NotificationEntity implements INotify {
        @PrimaryGeneratedColumn()
        id: number;

        @CreateDateColumn({ type: 'date', nullable: false})
        date: Date;

        @Column({nullable: false})
        account: string;

        @Column({nullable: false})
        subject: string;

        @Column({nullable: false})
        message: string;

    }