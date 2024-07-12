import { Module } from '@nestjs/common';
import { CmsController } from './cms.controller';
import { CmsService } from './cms.service';
import { StudentRepository } from 'src/student/student.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentEntity } from 'src/Entity/student.entity';
import { UploadService } from 'src/Helpers/upload.service';

@Module({
  imports: [TypeOrmModule.forFeature([StudentEntity])],
  controllers: [CmsController],
  providers: [CmsService, StudentRepository, UploadService ]
})
export class CmsModule {}
