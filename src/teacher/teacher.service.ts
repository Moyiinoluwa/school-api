import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt'
import { TeacherRepository } from './teacher.repository';
import { CreateTeacherDto, UpdateTeacherDto } from './teacher.dto';
import { TeacherEntity } from 'src/Entity/teacher.entity';
import { customAlphabet } from 'nanoid';
import { TeacherOtpRepository } from 'src/common/common.repository';
import { Mailer } from 'src/Mailer/mailer.service';
import { TeacherOtpEntity } from 'src/Entity/teacherOtp.entity';
import { ChangeApassword, LoginDto, ResetDto, resendTeacherOtpDto, resetTeacherPasswordDto, verifyTeacherOtpDto } from 'src/common/common.dto';
import { LessThan } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class TeacherService {
    constructor(@InjectRepository(TeacherRepository) private readonly teacherRepository: TeacherRepository,
        @InjectRepository(TeacherOtpRepository) private readonly teacherOtpRepository: TeacherOtpRepository,
        private readonly mailer: Mailer,
        private jwt: JwtService,
        private configService: ConfigService



    ) { }

    //hash password for registration
    async hashPassword(password: any): Promise<string> {
        return await bcrypt.hash(password, 12)
    }

    //compare password
    async comparePassword(password: any, userpassword: any): Promise<boolean> {
        return await bcrypt.compare(password, userpassword)
    }

    //create verification code
    async createCode() {
        const generateCode = customAlphabet('0123456789', 6)
        return generateCode();
    }

    //Generate access token
    async signToken(id: number, email: string, role: string) {
        const payload = {
            sub: id,
            email,
            role
        };

        const secret = this.configService.get('SECRET_KEY');
        const token = await this.jwt.signAsync(payload, {
            expiresIn: this.configService.get('EXPIRESIN'),
            secret: secret
        });

        return { accessToken: token }

    }
    //Create Teacher's account
    async createTeacher(dto: CreateTeacherDto): Promise<{ message: string }> {

        //check if teacher is registered
        const teacher = await this.teacherRepository.findOne({ where: { email: dto.email } })
        if (teacher) {
            throw new HttpException('teacher is registered', HttpStatus.FOUND)
        }

        //hash password
        const hash = await this.hashPassword(dto.password)

        //create a new teacher
        const newTeacher = new TeacherEntity();
        newTeacher.email = dto.email;
        newTeacher.fullname = dto.fullname;
        newTeacher.username = dto.username;
        newTeacher.qualification = dto.qualification;
        newTeacher.createdAt = new Date();
        newTeacher.password = hash;

        //save to database
        await this.teacherRepository.save(newTeacher);

        //set verification code
        const otpCode = await this.createCode();

        //set expiration time for verification code
        const codeTime = new Date();
        codeTime.setMinutes(codeTime.getMinutes() + 10)

        //save verification code to database
        const teacherOtp = new TeacherOtpEntity()
        teacherOtp.email = dto.email;
        teacherOtp.otp = otpCode;
        teacherOtp.expirationTime = codeTime;
        teacherOtp.createdAt = new Date();

        await this.teacherOtpRepository.save(teacherOtp)

        //send verification code to teacher via mail
        await this.mailer.sendVerificationMail(dto.email, otpCode, dto.username);

        return { message: 'teacher registered' }
    }

    //verify the verification code
    async verifyCode(dto: verifyTeacherOtpDto): Promise<{ message: string }> {
        //check if email is registered
        const code = await this.teacherOtpRepository.findOne({ where: { email: dto.email } })
        if (!code) {
            throw new HttpException('This email is not registered', HttpStatus.NOT_FOUND)
        }
        //check if otp is correct
        const teachOtp = await this.teacherOtpRepository.findOne({ where: { otp: dto.otp } })
        if (!teachOtp) {
            throw new HttpException('the otp you entered is not correct', HttpStatus.FORBIDDEN)
        }

        //check if the verification code has expired
        if (teachOtp.expirationTime <= new Date()) {
            throw new HttpException('the otp has expired, please request for a new one', HttpStatus.BAD_REQUEST)
        }

        //find the user attached to the email
        const teacher = await this.teacherRepository.findOne({ where: { email: dto.email } })
        if (teacher.email !== code.email) {
            throw new HttpException('the teacher is not registered', HttpStatus.NOT_FOUND)
        }
        //update profile
        teacher.isVerified = true;
        teacher.isRegistered = true
        teacher.isLoggedIn = true;

        // Update OTP verification status and save changes
        teachOtp.verified = true;

        await this.teacherRepository.save(teacher)

        return { message: 'Otp verified' }
    }

    //Resend verification code
    async resendCode(dto: resendTeacherOtpDto): Promise<{ message: string }> {

        //check if email is registered
        const teacher = await this.teacherRepository.findOne({ where: { email: dto.email } })
        if (!teacher) {
            throw new HttpException('Teacher cannot request for new code', HttpStatus.NOT_FOUND)
        };

        //check if the previous code has  not expired
        const code = await this.teacherOtpRepository.findOne({ where: { otp: dto.email, expirationTime: LessThan(new Date()) } })
        if (code) {
            throw new HttpException('the previous code has not expired', HttpStatus.BAD_REQUEST)
        }

        //generate code
        const newTeacherCode = await this.createCode();

        //set exipration time
        const codeWatch = new Date();
        codeWatch.setMinutes(codeWatch.getMinutes() + 10)

        //save code to database
        const codeAgain = new TeacherOtpEntity();
        codeAgain.email = dto.email;
        codeAgain.expirationTime = codeWatch;
        codeAgain.otp = newTeacherCode;
        codeAgain.createdAt = new Date();

        await this.teacherOtpRepository.save(codeAgain)

        //send to teacher via mail
        await this.mailer.sendVerificationMail(dto.email, newTeacherCode, teacher.username);

        return { message: 'A new code has been sent' }
    }


    //reset password link
    async resetTeacherPasswordLink(dto: ResetDto): Promise<{ message: string }> {
        //check if the email is registered
        const teacher = await this.teacherRepository.findOne({ where: { email: dto.email } })
        if (!teacher) {
            throw new HttpException('teacher cannot receive link', HttpStatus.NOT_FOUND)
        }

        //set the reset token
        const linkToken = uuidv4()

        //craft reset link
        const link = `http://localhost:5000/teacher/reset-password?=${linkToken}`

        //set expiration time for reset 
        const linkTime = new Date();
        linkTime.setMinutes(linkTime.getMinutes() + 10)

        //save to database
        teacher.resetLink = link;
        teacher.isResetLinkSent = true;
        //teacher.resetPasswordLinkExipration = linkTime

        await this.teacherRepository.save(teacher)

        //send link to teacher via mail
        await this.mailer.resetPasswordMail(dto.email, link, teacher.username)

        return { message: 'reset link sent' }
    }

    //reset password
    async resetTeacherPassword(dto: resetTeacherPasswordDto): Promise<{ message: string }> {
        //check if the email is registered
        const teacher = await this.teacherRepository.findOne({ where: { email: dto.email } })
        if (!teacher) {
            throw new HttpException('Teacher cannot reset password', HttpStatus.NOT_FOUND)
        }
        //valiadte the link
        if (teacher.resetLink !== dto.resetLink) {
            throw new HttpException('invalid reset link', HttpStatus.FORBIDDEN)
        }
        //reset password
        const hash = await this.hashPassword(dto.password)

        //save to database
        teacher.password = hash;

        return { message: 'password reset successfully' }
    }

    //login
    async loginTeacher(dto: LoginDto) {
        //checked if the teacher is registered
        const teacher = await this.teacherRepository.findOne({ where: { email: dto.email } })
        if (!teacher) {
            throw new BadRequestException('teacher cannot login')
        }

        // compare the password
        const access = await this.comparePassword(dto.password, teacher.password)
        if (!access) {
            teacher.loginCount = + 1;
        }

        //check if student has exceeded the login attempts
        if (teacher.loginCount >= 5) {
            teacher.isLocked = true;
            teacher.locked_until = new Date(Date.now() + 2 * 60 * 60 * 1000); //lock for two hours
            throw new BadRequestException('Invalid password, account locked for two hours')
        }

        //if the password matches  the reset the login count and unlock the account
        teacher.loginCount = 0;
        teacher.isLoggedIn = true;

        //if the student has not reached the number of login limit, calculate number of attempted left

        //check if the teacher is verified
        if (!teacher.isVerified) {
            throw new BadRequestException('Account is not verified, please request for verification code.')
        }

        //update teacher profile
        await this.teacherRepository.save(teacher)

        return await this.signToken(teacher.id, teacher.email, teacher.role)
    }

    //update account
    async updateTeacher(id: number, dto: UpdateTeacherDto): Promise<{ message: string }> {
        //verify teacher by id
        const teacher = await this.teacherRepository.findOne({ where: { id } })
        if (!teacher) {
            throw new BadRequestException('Teacher cannot update account')
        }

        //update changes
        teacher.email = dto.email;
        teacher.fullname = dto.fullname;
        teacher.qualification = dto.qualification;
        teacher.username = dto.username

        //save to database
        await this.teacherRepository.save(teacher)

        return { message: 'teacher profile updated' }
    }

    //change password
    async changeTeacherPassword(id: number, dto: ChangeApassword): Promise<{ message: string }> {
        const teacher = await this.teacherRepository.findOne({ where: { id } })
        if (!teacher) {
            throw new BadRequestException('Teacher cannot change password')
        }

        //compare password
        const validPassword = await this.comparePassword(dto.oldPassword, teacher.password)
        if (!validPassword) {
            throw new BadRequestException('The password you entered is incorrect')
        }

        //if password is valid, proceed to change password
        //hash new password
        const hash = await this.hashPassword(dto.newPassword)

        //update profile
        teacher.password = hash;

        //save to database
        await this.teacherRepository.save(teacher)

        return { message: 'Password changed!' }
    }

    //get all teachers
    async getTeachers(): Promise<TeacherEntity[]> {
        const teacher = await this.teacherRepository.find()
        return teacher;
    }

    //get a teacher profile
    async getTeacher(id: number) {
        //verify by id
        const teacher = await this.teacherRepository.findOne({ where: { id } })
        if (!teacher) {
            throw new BadRequestException('Cannot find teacher')
        } else {
            return teacher;
        }
    }

    //problems
    //resend otp
    //update account
}



