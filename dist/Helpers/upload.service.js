"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadService = void 0;
const common_1 = require("@nestjs/common");
const path_1 = require("path");
const fs_1 = require("fs");
const uuid_1 = require("uuid");
const fileType = require("file-type");
let UploadService = class UploadService {
    async uploadFile(file) {
        const extension = (0, path_1.extname)(file.originalname).toLowerCase();
        const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.mp4', '.ogg', '.webm'];
        const maxVideoLengthInSeconds = 120;
        const isSupportedVideoType = (mime) => {
            return mime.startsWith('video/') && ['mp4', 'ogg', 'webm'].includes(mime.split('/')[1]);
        };
        if (!allowedExtensions.includes(extension)) {
            throw new common_1.BadGatewayException('Only files with these extensions are allowed: ' + allowedExtensions.join(', '));
        }
        const fileInfo = await fileType.fromBuffer(file.buffer);
        if (!fileInfo) {
            throw new common_1.UnsupportedMediaTypeException('Unrecognized file format');
        }
        let filePath;
        if (fileInfo.mime.startsWith('image/')) {
            try {
                await fs_1.promises.access('Public');
            }
            catch {
                await fs_1.promises.mkdir('Public');
            }
            const fileName = (0, uuid_1.v4)() + extension;
            filePath = (0, path_1.join)('Public', fileName);
        }
        else if (isSupportedVideoType(fileInfo.mime)) {
            if (file.buffer.length > maxVideoLengthInSeconds * 1024 * 1024) {
                throw new common_1.BadRequestException(`Video length exceeds ${maxVideoLengthInSeconds} seconds`);
            }
            try {
                await fs_1.promises.access('public/videos');
            }
            catch {
                await fs_1.promises.mkdir('public/videos');
            }
            const fileName = (0, uuid_1.v4)() + extension;
            filePath = (0, path_1.join)('public/videos', fileName);
        }
        else {
            throw new common_1.BadRequestException('Only image and video files are allowed');
        }
        await fs_1.promises.writeFile(filePath, file.buffer);
        return filePath.split('/').pop();
    }
};
exports.UploadService = UploadService;
exports.UploadService = UploadService = __decorate([
    (0, common_1.Injectable)()
], UploadService);
//# sourceMappingURL=upload.service.js.map