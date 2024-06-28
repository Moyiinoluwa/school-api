import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentService } from './student.service';
import { StudentRepository } from './student.repository';
import { StudentEntity } from 'src/Entity/student.entity';
import { NotificationRepository, StudentOtpRepository } from 'src/common/common.repository';
import { StudentOtpEntity } from 'src/Entity/otp.entity';
import { Mailer } from 'src/Mailer/mailer.service';
import { NotificationEntity } from 'src/Entity/notification.entity';


@Module({
  imports: [TypeOrmModule.forFeature([StudentEntity, StudentOtpEntity, NotificationEntity])],
  controllers: [StudentController],
  providers: [StudentService, StudentRepository, StudentOtpRepository, Mailer, NotificationRepository],
})
export class StudentModule {}
