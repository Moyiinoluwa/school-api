import { Module } from '@nestjs/common';
import { CmsController } from './cms.controller';
import { CmsService } from './cms.service';
import { StudentRepository } from 'src/student/student.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentEntity } from 'src/Entity/student.entity';
import { UploadService } from 'src/Helpers/upload.service';
import { TeacherRepository } from 'src/teacher/teacher.repository';
import { AssignmentRepository, MessageRepository } from './cms.repository';
import { TeacherEntity } from 'src/Entity/teacher.entity';
import { MessageEntity } from 'src/Entity/message.entity';
import { AssignmentEntity } from 'src/Entity/assignment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StudentEntity, TeacherEntity, MessageEntity, AssignmentEntity])],
  controllers: [CmsController],
  providers: [CmsService, StudentRepository, UploadService, TeacherRepository, MessageRepository, AssignmentRepository ]
})
export class CmsModule {}
