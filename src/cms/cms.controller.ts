import { Controller, Get, Param, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
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

}