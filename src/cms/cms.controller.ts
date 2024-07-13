import { Body, Controller, Get, Param, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CmsService } from './cms.service';
import { UploadService } from 'src/Helpers/upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Role } from 'src/Enum/general.enum';

@Controller('cms')
export class CmsController {
    constructor(private cmsService: CmsService,
        private uploadService: UploadService
    ) { }

    //upload profile picture
   // @Role(Role.STUDENT, Role.ADMIN, Role.TEACHER)
    @Post('/profile-picture/:id')
    @UseInterceptors(FileInterceptor('file'))
    async uploadProfilePicture(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
        const filename = await this.uploadService.uploadFile(file)
        await this.cmsService.uploadProfilePicture(id, filename)
        return { message: 'profile picture uploaded' }
    }

    //view student score
   // @Role(Role.STUDENT)
    @Get('/view-score/:id')
    async viewStudentScore(@Param('id') id: string,  @Query('subject') subject: string): Promise<number> {
       return await this.cmsService.viewStudentScore(id, subject)  
}

    //student send teacher message
    @Post('/message/:sender_id/:reciever_id')
    async sendTeacherMessage(@Param('sender_id') sender_id: string,   @Param('reciever_id') reciever_id: string,
     @Body('message') message: string): Promise<{ message: string }> {
        return await this.cmsService.messageTeacher(sender_id, reciever_id, message)
    }

    //student send message to another student
    @Post('/message-student/:sender_id/:reciever_id')
    async sendStudentMessage(@Param('sender_id') sender_id: string,   @Param('reciever_id') reciever_id: string,
    @Body('message') message: string): Promise<{ message: string }> {
        return await this.cmsService.studentToStudent(sender_id, reciever_id, message)
    }

    
}