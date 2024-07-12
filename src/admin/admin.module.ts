import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminEntity } from 'src/Entity/admin.entity';
import { AdminOtpEnitity } from 'src/Entity/adminOtp.entity';
import { AdminRepository } from './admin.repository';
import { Mailer } from 'src/Mailer/mailer.service';
import { AdminOtpRepository } from 'src/common/common.repository';


@Module({
  imports: [TypeOrmModule.forFeature([AdminEntity, AdminOtpEnitity])],
  controllers: [AdminController],
  providers: [ AdminService, AdminRepository, AdminOtpRepository, Mailer]
})
export class AdminModule {}
