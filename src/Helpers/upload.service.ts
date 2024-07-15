import { BadGatewayException, BadRequestException, Injectable, UnsupportedMediaTypeException } from '@nestjs/common';
import { extname, join } from 'path';
import { promises as fs } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import * as fileType from 'file-type';


@Injectable()
export class UploadService {
    async uploadFile(file: Express.Multer.File): Promise<string> {
        //Get the file extention and convert is to lowercase
        const extension = extname(file.originalname).toLowerCase();
        // The type of file extention allowed
        const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.mp4', '.ogg', '.webm', '.docx', '.pdf', '.word'];
        // maximum video length in seconds
        const maxVideoLengthInSeconds = 120;

        //function to check if a MIME type is a supported video type
        const isSupportedVideoType = (mime: string) => {
            return mime.startsWith('video/') && ['mp4', 'ogg', 'webm'].includes(mime.split('/')[1]);
        };

        // Check if the file extension is allowed
        if (!allowedExtensions.includes(extension)) {
            throw new BadGatewayException('Only files with these extensions are allowed: ' + allowedExtensions.join(', '));
        }

        // Get file information using the fileType module
        const fileInfo = await fileType.fromBuffer(file.buffer);

        // If file information cannot be determined, throw an exception
        if (!fileInfo) {
            throw new UnsupportedMediaTypeException('Unrecognized file format');
        }

        // Initialize filePath variable
        let filePath: string;

        // If the file is an image
        if (fileInfo.mime.startsWith('image/')) {
            try {
                // Check if the 'Public' directory exists
                await fs.access('Public');
            } catch {
                // If it does not exist, create it
                await fs.mkdir('Public');
            }

            // Generate a unique file name and set the file path
            const fileName = uuidv4() + extension;
            filePath = join('Public', fileName);

            // If the file is a supported video type
        } else if (isSupportedVideoType(fileInfo.mime)) {
            // Check if the video length exceeds the maximum allowed length
            if (file.buffer.length > maxVideoLengthInSeconds * 1024 * 1024) {
                throw new BadRequestException(`Video length exceeds ${maxVideoLengthInSeconds} seconds`);
            }

            try {
                // Check if the 'public/videos' directory exists
                await fs.access('public/videos');
            } catch {
                // If it does not exist, create it
                await fs.mkdir('public/videos');
            }

            // Generate a unique file name and set the file path
            const fileName = uuidv4() + extension;
            filePath = join('public/videos', fileName);

            // Handling document file types
        } else if (['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword'].includes(fileInfo.mime)) {
            try {
                // Check if the 'Public/documents' directory exists
                await fs.access('Public/documents');
            } catch {
                // If it does not exist, create it
                await fs.mkdir('Public/documents');
            }

            // Generate a unique file name and set the file path
            const fileName = uuidv4() + extension;
            filePath = join('Public/documents', fileName);

            // If the file is neither an image, a supported video type, nor a supported document type
        } else {
            throw new BadRequestException('Only image, video, and document files are allowed');
        }

        // Write the file to the specified path
        await fs.writeFile(filePath, file.buffer);

        // Return the file name (without the directory path) by splitting the file path and taking the last part
        return filePath.split('/').pop()!;
    }
}
