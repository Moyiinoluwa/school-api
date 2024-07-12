import { BadGatewayException, BadRequestException, Injectable, UnsupportedMediaTypeException } from '@nestjs/common';
import { extname, join } from 'path';
import { promises as fs } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import * as fileType from 'file-type';

@Injectable()
export class UploadService {
    async uploadFile(file: Express.Multer.File): Promise<string> {
        const extension = extname(file.originalname).toLowerCase();
        const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.mp4', '.ogg', '.webm'];
        const maxVideoLengthInSeconds = 120;

        const isSupportedVideoType = (mime: string) => {
            return mime.startsWith('video/') && ['mp4', 'ogg', 'webm'].includes(mime.split('/')[1]);
        };

        if (!allowedExtensions.includes(extension)) {
            throw new BadGatewayException('Only files with these extensions are allowed: ' + allowedExtensions.join(', '));
        }

        const fileInfo = await fileType.fromBuffer(file.buffer); // Use fromBuffer method

        if (!fileInfo) {
            throw new UnsupportedMediaTypeException('Unrecognized file format');
        }

        let filePath: string;

        if (fileInfo.mime.startsWith('image/')) {
            try {
                await fs.access('Public');
            } catch {
                await fs.mkdir('Public');
            }

            const fileName = uuidv4() + extension;
            filePath = join('Public', fileName);

        } else if (isSupportedVideoType(fileInfo.mime)) {
            if (file.buffer.length > maxVideoLengthInSeconds * 1024 * 1024) {
                throw new BadRequestException(`Video length exceeds ${maxVideoLengthInSeconds} seconds`);
            }

            try {
                await fs.access('public/videos');
            } catch {
                await fs.mkdir('public/videos');
            }

            const fileName = uuidv4() + extension;
            filePath = join('public/videos', fileName);

        } else {
            throw new BadRequestException('Only image and video files are allowed');
        }

        await fs.writeFile(filePath, file.buffer);

        return filePath.split('/').pop()!;
    }
}
