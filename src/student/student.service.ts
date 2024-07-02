import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentRepository } from './student.repository';
import { CreateStudentDto } from './student.dto';
import * as bcrypt from 'bcrypt';
import { StudentEntity } from 'src/Entity/student.entity';
import { customAlphabet } from 'nanoid';
import { StudentOtpEntity } from 'src/Entity/otp.entity';
import { NotificationRepository, StudentOtpRepository } from 'src/common/common.repository';
import { Mailer } from 'src/Mailer/mailer.service';
import { NotificationEntity } from 'src/Entity/notification.entity';
import { LoginDto, ResendOtpDto, ResetPassword, ResetPasswordLinkDto, VerifyOtpDto } from 'src/common/common.dto';
import { LessThan } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';




@Injectable()
export class StudentService {
    constructor(@InjectRepository(StudentRepository) private readonly studentRepository: StudentRepository,
        @InjectRepository(StudentOtpRepository) private readonly studentOtpRepository: StudentOtpRepository,
        @InjectRepository(NotificationRepository) private readonly notificationRepository: NotificationRepository,
        private readonly mailer: Mailer,
        private jwt: JwtService,
        private configService: ConfigService
    ) { }

    //sign up password
    async hashPassword(password: any): Promise<string> {
        return await bcrypt.hash(password, 12)
    }

    //login password
    async comparePassword(password, userpassword): Promise<boolean> {
        return await bcrypt.compare(password, userpassword)
    }

    //set verification code
    async verificationCode() {
        const generate = customAlphabet('1234567890', 6);
        return generate();
    }

    //Access token
    async signToken(id: string, email: string, role: string) {
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

        return { accesstoken: token }

    }


    async createStudent(dto: CreateStudentDto): Promise<{ message: string }> {
        const studentRegister = await this.studentRepository.findOne({ where: { email: dto.email } });

        if (studentRegister) {
            throw new HttpException('this student already exist', HttpStatus.FOUND)
        }


        const hash = await this.hashPassword(dto.password);

        const student = new StudentEntity();
        student.username = dto.username;
        student.surname = dto.surname;
        student.name = dto.name;
        student.email = dto.email;
        student.createdAt = new Date();
        student.password = hash

        //save to database
        await this.studentRepository.save(student);

        //generate verification code
        const emailCode = await this.verificationCode();

        //send verification code to student via mail
        await this.mailer.sendVerificationMail(dto.email, emailCode, dto.username)

        //set expiration time for otp 
        const otpExpiration = new Date();
        await otpExpiration.setMinutes(otpExpiration.getMinutes() + 10)

        //save otp code to Otp table
        const otp = new StudentOtpEntity()
        otp.email = dto.email;
        otp.otp = emailCode;
        otp.expirationTime = otpExpiration;

        await this.studentOtpRepository.save(otp)

        //save the notification
        const notification = new NotificationEntity()
        notification.account = student.name;
        notification.subject = 'New Student Created';
        notification.message = `new student registered successfully`;

        await this.notificationRepository.save(notification)

        return { message: 'student registered' }
    }

    //verify otp
    async verifyOtp(dto: VerifyOtpDto): Promise<{ isValid: boolean }> {

        //check if the email is registered
        const otpEmail = await this.studentOtpRepository.findOne({ where: { email: dto.email } })
        if (!otpEmail) {
            throw new HttpException('this was not the email the otp was sent to', HttpStatus.NOT_FOUND)
        }

        //check if otp is correct
        const otp = await this.studentOtpRepository.findOne({ where: { otp: dto.otp } })
        if (!otp) {
            throw new HttpException('the otp is not correct', HttpStatus.NOT_FOUND)
        }

        // check if the verification code has expired
        if (otp.expirationTime <= new Date()) {
            throw new HttpException('otp has expired, please request for another one', HttpStatus.BAD_REQUEST)
        }

        //find the student linked to the email without the user entering the email
        const student = await this.studentRepository.findOne({ where: { email: dto.email } })
        if (student.email !== otpEmail.email) {
            throw new HttpException('the student is not registered', HttpStatus.NOT_FOUND)
        }
        else {
            student.isLoggedIn = true;
            student.isRegistered = true;
            student.isVerified = true;

            //set the notification
            const notification = new NotificationEntity()
            notification.account = student.name;
            notification.subject = 'Student Otp verified';
            notification.message = `hello ${student.name}, your otp has been verified`;

            //save notification to database
            await this.notificationRepository.save(notification)

            //save to verification notice to student database
            await this.studentRepository.save(student)
        }

        //generate access token
        // const accessToken = await this.signToken(
        //     student.id,
        //     student.email,
        //     student.role
        // )
        return { isValid: true }
    }

    //resend otp
    async ResendOtp(dto: ResendOtpDto): Promise<{ message: string }> {

        //check if the student is registered
        const student = await this.studentRepository.findOne({ where: { email: dto.email } })
        if (!student) {
            throw new HttpException(`Student with ${dto.email} does not exists, plesea check the email you entered`, HttpStatus.NOT_FOUND)
        };

        //check if the previous otp sent has expired
        const otp = await this.studentOtpRepository.findOne({ where: { otp: dto.email, expirationTime: LessThan(new Date()) } })
        if (!otp) {
            throw new HttpException('Previous Otp has not expired', HttpStatus.BAD_REQUEST)
        };

        //generate new otp
        const otpCode = await this.verificationCode();

        //set expiration time for otp
        const otpTime = new Date();
        await otpTime.setMinutes(otpTime.getMinutes() + 10)

        //save new otp to database
        const newOtp = new StudentOtpEntity()
        newOtp.email = dto.email;
        newOtp.expirationTime = otpTime;
        newOtp.otp = otpCode;

        await this.studentOtpRepository.save(newOtp)

        //save the notification
        const notification = new NotificationEntity()
        notification.account = dto.email;
        notification.subject = 'New otp sent to student';
        notification.message = ``

        //send new otp via mail
        await this.mailer.sendVerificationMail(newOtp.email, otpCode, student.name)

        return { message: 'new otp sent' }

    }

    //Reset password link
    async ResetPasswordLink(dto: ResetPasswordLinkDto): Promise<{ message: string }> {

        //check if the email is regsitered
        const student = await this.studentRepository.findOne({ where: { email: dto.email } })
        if (!student) {
            throw new HttpException('this email is not registered on the server', HttpStatus.NOT_FOUND)
        }

        //get reset token
        const resetToken = uuidv4()

        //set expiration time for token
        const tokenTime = new Date()
        tokenTime.setMinutes(tokenTime.getMinutes() + 10)

        //craft reset link
        const resetLink = `http://localhost:5000/student/reset-password?token=${resetToken}`

        //update the student table
        student.isResetLink = resetLink;
        student.isresetPasswordLinkSent = true;
        student.resetPasswordLinkExpirationTime = tokenTime

        //save to database
        await this.studentRepository.save(student)

        //send reset link via mail
        await this.mailer.resetPasswordMail(dto.email, resetLink, student.name)

        return { message: 'reset password link sent' }
    }

    //Reset Password
    async ResetPassword(dto: ResetPassword): Promise<{ message: string }> {

        //verify the user
        const student = await this.studentRepository.findOne({ where: { email: dto.email } })
        if (!student) {
            throw new HttpException('this student cannot reset password', HttpStatus.NOT_FOUND)
        }

        //validate the reset link
        if (student.isResetLink !== dto.resetLink) {
            throw new HttpException('Invalid reset link', HttpStatus.FORBIDDEN)
        }

        //create a new password
        const newPassword = await this.hashPassword(dto.password);
        student.password = newPassword;

        //set notification
        const notification = new NotificationEntity()
        notification.account = student.name;
        notification.subject = 'New Password set';
        notification.message = `Hello ${student.name}, your new password has been set`;

        //save to database
        await this.notificationRepository.save(notification)

        return { message: 'Password Reset successfully' }
    }

    //Login
    async login(dto: LoginDto) {

        //check  if the user is registered
        const student = await this.studentRepository.findOne({ where: { email: dto.email } })
        if (!student) {
            throw new HttpException('Invalid email or password', HttpStatus.UNAUTHORIZED)
        }

        //compare the password the student entered with the one saved on the databse
        const compare = await this.comparePassword(dto.password, student.password)
        if (!compare) {
            student.loginCount += 1;
        }

        //check if the student has exceeded the login attempt limit
        if (student.loginCount >= 5) {
            student.isLocked = true;
            student.locked_until = new Date(Date.now() + 2 * 60 * 60 * 1000); // lock for 2 hours
            await this.studentRepository.save(student)
            throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED)
        }

        //if the student account has not been verified
        if(!student.isVerified)  {
            throw new HttpException('Account is not verified, please request for a verification code', HttpStatus.UNAUTHORIZED)
        }

        //if the password matches, reset the login count and unlock the account
        student.loginCount = 0;
        student.isLoggedIn = true;

        // //if the student has not reached the attempt limit, calculate number of attempts left
        // const attemptLeft = 5 - student.loginCount;
        // await this.studentRepository.save(student)

        // throw new HttpException(`invalid credentails ${attemptLeft} attempts before your account is locked`, HttpStatus.NOT_FOUND)

        //save to database
        await this.studentRepository.save(student)

        return await this.signToken(student.id, student.email,student.role)
    }
}
