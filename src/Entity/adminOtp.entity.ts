import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export interface IAdminOtp {
    id: string
    otp: string;
    email: string;
    expirationTime: Date;
    createdAt: Date;
    verified: boolean
}

@Entity({ name: 'adminotp'})
    export class AdminOtpEnitity implements IAdminOtp {
        @PrimaryGeneratedColumn('uuid')
        id: string;

        @Column({ nullable: false })
        otp: string;

        @Column({nullable: false, unique: true})
        email: string;

        @Column()
        expirationTime: Date;

        @Column({nullable: false})
        createdAt: Date;

        @Column({ nullable: false })
        verified: boolean;
    }