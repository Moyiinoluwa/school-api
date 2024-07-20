import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AdminEntity } from 'src/Entity/admin.entity';
import { AdminOtpEnitity } from 'src/Entity/adminOtp.entity';
import { AssignmentEntity } from 'src/Entity/assignment.entity';
import { MessageEntity } from 'src/Entity/message.entity';
import { NotificationEntity } from 'src/Entity/notification.entity';
import { StudentOtpEntity } from 'src/Entity/otp.entity';
import { StudentEntity } from 'src/Entity/student.entity';
import { TeacherEntity } from 'src/Entity/teacher.entity';
import { TeacherOtpEntity } from 'src/Entity/teacherOtp.entity';

@Injectable()
export class TypeormService {
    constructor(private configservice: ConfigService) {}

    createTypeOrmOptions(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
        return {
            type: 'postgres',
            host:  this.configservice.get('DATABASE_HOST'),
            port:  this.configservice.get('DATABASE_PORT'),
            username:  this.configservice.get('DATABASE_USER'),
            password: String (this.configservice.get('DATABASE_PASSWORD')),
            database: this.configservice.get('DATABASE_NAME'),
            entities: [StudentEntity,
                StudentOtpEntity,
                NotificationEntity,
                TeacherEntity,
                TeacherOtpEntity, 
                AdminEntity,
                AdminOtpEnitity,
                MessageEntity,
                AssignmentEntity
            ],
            synchronize: true
        }
    }
}
