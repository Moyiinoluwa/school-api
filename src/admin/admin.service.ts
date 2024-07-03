import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminRepository } from './admin.repository';
import { AdminOtpRepository } from 'src/common/common.repository';
import { CreateAdminDto } from './admin.dto';
import * as bcrypt from 'bcrypt';
import { AdminEntity } from 'src/Entity/admin.entity';
import { customAlphabet } from 'nanoid';
import { AdminOtpEnitity } from 'src/Entity/adminOtp.entity';
import { Mailer } from 'src/Mailer/mailer.service';

@Injectable()
export class AdminService {
    constructor(@InjectRepository(AdminRepository) private readonly adminRepository: AdminRepository,
        @InjectRepository(AdminOtpRepository) private readonly adminOtpRepository: AdminOtpRepository,
        private readonly mailer: Mailer
    ) { }

    //hash password for registration
    async hashPassword(password: any): Promise<string> {
        return await bcrypt.hash(password, 12)
    }

    //verification code
    async codeDigit() {
        const code = customAlphabet('1234567890', 6)
        return code();
    }


    //create admin account
    async registerAdmin(dto: CreateAdminDto): Promise<{ message: string }> {

        //check if admin has registered
        const admin = await this.adminRepository.findOne({ where: { email: dto.email } })
        if (!admin) {
            throw new HttpException('admin is registered', HttpStatus.FOUND)
        }

        //hash password
        const hash = await this.hashPassword(dto.password)

        //create new admin
        const newAdmin = new AdminEntity()
        newAdmin.fullname = dto.fullname;
        newAdmin.email = dto.email;
        newAdmin.username = dto.username;
        newAdmin.createdAt = new Date();
        newAdmin.password = hash;

        //save to database
        await this.adminRepository.save(newAdmin)

        //generate verification code
        const code = await this.codeDigit();

        //set expiration time for verification code
        const codeLimit = new Date();
        codeLimit.setMinutes(codeLimit.getMinutes() + 10)

        //save verification code to database
        const otpCode = new AdminOtpEnitity()
        otpCode.email = dto.email;
        otpCode.expirationTime = codeLimit;
        otpCode.createdAt = new Date();
        otpCode.otp = code;

        await this.adminOtpRepository.save(otpCode)

        //send verification code to admin via mail
        await this.mailer.sendVerificationMail(dto.email, code, admin.username)

        return { message: 'admin is regsitered'}
    }
}
