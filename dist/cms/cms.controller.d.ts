/// <reference types="multer" />
import { CmsService } from './cms.service';
import { UploadService } from 'src/Helpers/upload.service';
export declare class CmsController {
    private cmsService;
    private uploadService;
    constructor(cmsService: CmsService, uploadService: UploadService);
    uploadProfilePicture(id: string, file: Express.Multer.File): Promise<{
        message: string;
    }>;
    viewStudentScore(id: string, subject: string): Promise<number>;
    sendTeacherMessage(sender_id: string, reciever_id: string, message: string): Promise<{
        message: string;
    }>;
    sendStudentMessage(sender_id: string, reciever_id: string, message: string): Promise<{
        message: string;
    }>;
}
