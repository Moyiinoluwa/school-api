import { Body, Controller, Get, Param, Patch, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CmsService } from './cms.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { SendEmailTeacher, SendMailToStudent, StudentScoreDto } from './cms.dto';


@Controller('cms')
export class CmsController {
    constructor(private cmsService: CmsService ) {}

    //upload profile picture
   @Post('/profile-picture/:id')
   @UseInterceptors(FileInterceptor('file'))
   async uploadProfilePicture( @Param('id') id: number,  @UploadedFile() file: Express.Multer.File ) {
       return await this.cmsService.uploadProfilePicture(id, file);
   }

    //view student score
    @Get('/view-score/:id')
    async viewStudentScore(@Param('id') id: number,  @Query('subject') subject: string) {
       return await this.cmsService.viewStudentScore(id, subject)  
}

    //student send teacher message
    @Post('/message/:sender_id/:reciever_id')
    async sendTeacherMessage(@Param('sender_id') sender_id: number, @Param('reciever_id') reciever_id: number,
     @Body('message') message: string) {
        return await this.cmsService.messageTeacher(sender_id, reciever_id, message)
    }

    //student send message to another student
    @Post('/message-student/:sender_id/:reciever_id')
    async sendStudentMessage(@Param('sender_id') sender_id: number, @Param('reciever_id') reciever_id: number,
    @Body('message') message: string) {
        return await this.cmsService.studentToStudent(sender_id, reciever_id, message)
    }

    //student upload answer to assignment
     @Post('/upload-answer/:id')
    @UseInterceptors(FileInterceptor('file'))
     async uploadAnswer(@Param('id') id: number,  @UploadedFile() file: Express.Multer.File) {
        return await this.cmsService.uploadAnswer(id, file)
    }

    //Upload Teacher profile picture
    @Patch('/upload-pic/:id')
    @UseInterceptors(FileInterceptor('file'))
    async uploadTeacherPicture(@Param('id') id: number, @UploadedFile() file: Express.Multer.File) {
        return await this.cmsService.uploadTeacherPicture(id, file)
    }

    //Teacher uploads student's assignment
    @Post('/send-assignment/:teacher_id/:student_id')
    @UseInterceptors(FileInterceptor('file')) 
    async sendAssignment (@Param('teacher_id') teacher_id: number,
     @Param('student_id') student_id: number, @UploadedFile() file: Express.Multer.File) {
        return await this.cmsService.uploadAssignment(teacher_id, student_id, file)
     }

     //Teacher sets score for each assignment
     @Post('/set/:teacher_id/:student-id')
     async setScore(@Param('teacher_id') teacher_id: number, @Param('student_id') student_id: number,
     @Param('assign_id')  assign_id: number, @Body() dto: StudentScoreDto) {
        return await this.cmsService.studentScore(teacher_id, student_id, assign_id, dto)
     }

     //Teacher edit student score
     @Patch('/edit/:studentId/:teacherid/:assignmentId')
     async editScore(@Param('studentId') studentId: number, @Param('teacherId') teacherId: number, 
     @Param('assignmentId') assignmentId: number, @Body() dto: StudentScoreDto) {
        return await this.cmsService.editScore(studentId,teacherId,assignmentId,dto)
     }

     //Teacher sends message to student
     @Post('/send/:teacherId/:stuentId')
     async messageStudent(@Param('teacherId') teacherId: number, @Param('studentId') studentId: number, @Body() message:string) {
        return await this.cmsService.messageStudent(teacherId, studentId, message)
     }

     //Teacher sends message to teacher
    @Post('/send-teacher/:teacherid/:teacherId')
    async teacher(@Param('teacherId') teacherId: number, @Param('teaacherId') teaacherId: number, @Body() message: string) {
        return await this.cmsService.teacherToTeacher(teacherId, teaacherId, message)
    }

    //Admin get all student
    @Get('/get-students')
    async getStudent() {
        return await this.cmsService.getStudent()
    }

    //Admin get all teachers
    @Get('/get-teachers')
    async getTeacher() {
        return await this.cmsService.getTeacher()
    }

    //Admin sends email to student
    @Post('/mail-student/:id')
    async sendMail(@Param('id') id: number) {
        return await this.cmsService.sendMailToStudent(id)
    }

    //Admin send mail to teachers
    @Post('/mail-teacher/:id')
    async sendMailTeacher(@Param('id') id: number) {
        return await this.cmsService.sendMailToTeachers(id)
    }
}
