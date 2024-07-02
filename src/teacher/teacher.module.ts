import { Module } from '@nestjs/common';
import { TeacherController } from './teacher.controller';
import { TeacherService } from './teacher.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeacherEntity } from 'src/Entity/teacher.entity';
import { TeacherOtpEntity } from 'src/Entity/teacherOtp.entity';
import { TeacherOtpRepository } from 'src/common/common.repository';
import { TeacherRepository } from './teacher.repository';
import { Mailer } from 'src/Mailer/mailer.service';

@Module({
  imports: [TypeOrmModule.forFeature([TeacherEntity, TeacherOtpEntity])],
  controllers: [TeacherController],
  providers: [TeacherService, TeacherOtpRepository, TeacherRepository, Mailer]
})
export class TeacherModule {}
