/// <reference types="multer" />
export declare class UploadService {
    uploadFile(file: Express.Multer.File): Promise<string>;
}
