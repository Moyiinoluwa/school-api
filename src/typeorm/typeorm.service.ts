import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { NotificationEntity } from 'src/Entity/notification.entity';
import { StudentOtpEntity } from 'src/Entity/otp.entity';
import { StudentEntity } from 'src/Entity/student.entity';

@Injectable()
export class TypeormService {
    constructor(private configservice: ConfigService) { }

    createTypeOrmOptions(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
        return {
            type: 'postgres',
            host: 'localhost', //this.configservice.get('DATABASE_HOST'),
            port: 5432, //this.configservice.get('DATABASE_PORT'),
            username: 'postgres', // this.configservice.get('DATABASE_USER'),
            password: 'Collins05', //String (this.configservice.get('DATABASE_PASSWORD')),
            database: 'school-app', //this.configservice.get('DATABASE_NAME'),
            entities: [StudentEntity,
                StudentOtpEntity,
                NotificationEntity
            ],
            synchronize: true
        }
    }
}
