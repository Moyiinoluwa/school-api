import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './student/student.module';
import { CommonModule } from './common/common.module';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormService } from './typeorm/typeorm.service';
import { TeacherModule } from './teacher/teacher.module';
import { AdminModule } from './admin/admin.module';



@Module({
  imports: [
    StudentModule,
    TypeOrmModule.forRootAsync({ useClass: TypeormService}),
    CommonModule,
    ConfigModule.forRoot({ isGlobal: true,  envFilePath: '.env' }),
    MailerModule.forRoot({
      transport: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
           user: 'nodetutorial15@gmail.com',
           pass: 'mofillamqccvfddl'
        },
      },
    }),
    TeacherModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
 
