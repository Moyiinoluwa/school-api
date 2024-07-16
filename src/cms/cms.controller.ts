import { Body, Controller, Get, Param, Patch, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CmsService } from './cms.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { StudentScoreDto } from './cms.dto';


@Controller('cms')
export class CmsController {
    constructor(private cmsService: CmsService ) {}

    //upload profile picture
   @Post('/profile-picture/:id')
   @UseInterceptors(FileInterceptor('file'))
   async uploadProfilePicture( @Param('id') id: string,  @UploadedFile() file: Express.Multer.File ) {
       return await this.cmsService.uploadProfilePicture(id, file);
   }

    //view student score
    @Get('/view-score/:id')
    async viewStudentScore(@Param('id') id: string,  @Query('subject') subject: string) {
       return await this.cmsService.viewStudentScore(id, subject)  
}

    //student send teacher message
    @Post('/message/:sender_id/:reciever_id')
    async sendTeacherMessage(@Param('sender_id') sender_id: string,   @Param('reciever_id') reciever_id: string,
     @Body('message') message: string) {
        return await this.cmsService.messageTeacher(sender_id, reciever_id, message)
    }

    //student send message to another student
    @Post('/message-student/:sender_id/:reciever_id')
    async sendStudentMessage(@Param('sender_id') sender_id: string,   @Param('reciever_id') reciever_id: string,
    @Body('message') message: string) {
        return await this.cmsService.studentToStudent(sender_id, reciever_id, message)
    }

    //student upload answer to assignment
     @Post('/upload-assignment/:id')
    @UseInterceptors(FileInterceptor('file'))
     async uploadAnswer(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
        return await this.cmsService.uploadAnswer(id, file)
    }

    //Upload Teacher profile picture
    @Patch('/upload-pic/:id')
    @UseInterceptors(FileInterceptor('file'))
    async uploadTeacherPicture(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
        return await this.cmsService.uploadTeacherPicture(id, file)
    }

    //Teacher uploads student's assignment
    @Post('/send-assignment/:teacher_id/:student_id')
    @UseInterceptors(FileInterceptor('file')) 
    async sendAssignment (@Param('teacher_id') teacher_id: string,
     @Param('student_id') student_id: string, @UploadedFile() file: Express.Multer.File) {
        return await this.cmsService.uploadAssignment(teacher_id, student_id, file)
     }

     //Teacher sets score for each assignment
     @Post('/set-score/:teacher_id/:student-id')
     async setScore(@Param('teacher_id') teacher_id: string, @Param('student_id') student_id: string,
     @Param('assign_id')  assign_id: string, @Body() dto: StudentScoreDto) {
        return await this.cmsService.studentScore(teacher_id, student_id, assign_id, dto)
     }

}
