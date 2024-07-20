import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminRepository } from './admin.repository';
import { CreateAdminDto } from './admin.dto';
import * as bcrypt from 'bcrypt';
import { AdminEntity } from 'src/Entity/admin.entity';
import { customAlphabet } from 'nanoid';
import { AdminOtpEnitity } from 'src/Entity/adminOtp.entity';
import { Mailer } from 'src/Mailer/mailer.service';
import { AdminOtpRepository } from 'src/common/common.repository';
import { VerifyAdminOtp, ResendAdminOtpDto, ResetAdminPasswordLink, ResetAdminPassword } from 'src/common/common.dto';
import { LessThan } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

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
        if (admin) {
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
        await this.mailer.sendVerificationMail(dto.email, code, newAdmin.username)

        return { message: 'admin is regsitered' }
    }

    //verify otp
    async verifyAdminOtp(dto: VerifyAdminOtp): Promise<{ isValid: true }> {
        //check if the user is registered
        const admin = await this.adminOtpRepository.findOne({ where: { email: dto.email } })
        if (!admin) {
            throw new HttpException('admin cannot verify otp', HttpStatus.NOT_FOUND)
        }

        //check if otp is correct
        const otp = await this.adminOtpRepository.findOne({ where: { otp: dto.otp } })
        if (!otp) {
            throw new HttpException('otp is not correct', HttpStatus.NOT_FOUND)
        }
        //check if otp has expired
        if (otp.expirationTime <= new Date()) {
            throw new HttpException('otp has expired', HttpStatus.FORBIDDEN)
        }

        //find the user associated with the email
        const user = await this.adminRepository.findOne({ where: { email: dto.email } })
        if (user.email !== otp.email) {
            throw new HttpException('the email does not match the email the otp was sent to', HttpStatus.FORBIDDEN)
        } else {

            //set to verified
            otp.verified = true
        }

        return { isValid: true }
    }

    //resend otp
    async resendAdminOtp(dto: ResendAdminOtpDto): Promise<{ message: string }> {
        //check if admin is registered
        const admin = await this.adminRepository.findOne({ where: { email: dto.email } })
        if (!admin) {
            throw new HttpException('admin cannot reques a new code', HttpStatus.NOT_FOUND)
        }
        //check if previous verification code has expired
        const previousCode = await this.adminOtpRepository.findOne({ where: { otp: dto.email, expirationTime: LessThan(new Date()) } })
        if (previousCode) {
            throw new HttpException('previous code has not expired', HttpStatus.BAD_REQUEST)
        }
        //generate  a new code
        const code = await this.codeDigit();

        //set expiration time
        const expiration = new Date()
        expiration.setMinutes(expiration.getMinutes() + 10)

        //save new code to database;
        const newCode = new AdminOtpEnitity()
        newCode.email = dto.email;
        newCode.expirationTime = expiration;
        newCode.createdAt = new Date();
        newCode.otp = code;

        await this.adminOtpRepository.save(newCode);

        //send to user via mail
        await this.mailer.sendVerificationMail(dto.email, code, admin.username)

        return { message: 'New otp has been sent' }
    }

    //Reset password link
    async resetAdminPasswordLink(dto: ResetAdminPasswordLink): Promise<{ message: string }> {
        //check if the user is registered
        const admin = await this.adminRepository.findOne({ where: { email: dto.email } })
        if (!admin) {
            throw new HttpException('admin cannot request for password link', HttpStatus.NOT_FOUND)
        }
        //generate reset token
        const token = uuidv4();

        //create the reset link
        const link = `http://localhost:5000/admin/reset-token${token}`

        //set expiration time for reset link
        const date = new Date();
        date.setMinutes(date.getMinutes() + 10)

        //send via mail
        await this.mailer.resetPasswordMail(dto.email, link, admin.username);

        //update on admin profile on database
        admin.resetLink = link;
        admin.isResetLinkSent = true;
        admin.resetLinlExpirationTime = date;

        return { message: 'password reset link sent ' }
    }

    //Reset Password
    async resetAdminPassword(dto: ResetAdminPassword): Promise<{ message: string }> {
        //check if user is registered
        const admin = await this.adminRepository.findOne({ where: { email: dto.email}})
        if(!admin) {
            throw new HttpException('admin cannot reset pasword', HttpStatus.NOT_FOUND)
        }

        //check if resetlink is valid
        if(admin.resetLink !== dto.resetLink) {
            throw new HttpException('invalid reset link', HttpStatus.NOT_FOUND)
        }

        //hash password
        const hash = await this.hashPassword(dto.password);

        //update admin profile
        admin.password = hash;

        return { message: 'password reset'}
    }

    //LOGIN
    //change password
    //update profile
    //delete profile
    //get all admin
    //get an admin
    //logout
}

