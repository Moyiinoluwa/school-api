import { IsEmail, IsNotEmpty } from "class-validator";
import { Role } from "src/Enum/general.enum";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

 export interface IAdmin {
    id: string
    fullname: string;
    email: string;
    password: string;
    username: string
    createdAt: Date;
    isActive: true;
    // isRegistered: boolean;
    // isLoggedIn: boolean;
    // isLoggedOut: boolean;
    // resetLink: string;
    // isResetLinkSent: boolean;
    // resetLinlExpirationTime: Date;
    // role: Role;
 }

@Entity({ name: 'admin'})
 export class AdminEntity implements IAdmin {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ nullable: false })
    fullname: string;

    
    @Column({ nullable: false, unique: true})
    email: string;

    @Column({ nullable: true})
    password: string;

    @Column({ nullable: false, unique: true})
    username: string;

    @CreateDateColumn ({ nullable: false })
    createdAt: Date;

    @Column({ nullable: false})
    isActive: true;
 }