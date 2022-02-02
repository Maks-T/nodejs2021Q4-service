import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import storageOptions from './storage.config';
import * as fs from 'fs';
import * as path from 'path';

@Controller('file')
export class FileController {
  @Post('')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: storageOptions,
    }),
  )
  upload(@UploadedFile() file) {
    return {
      message: `The ${file.originalname} was successfully uploaded to the server! To download this file, use the link 'localhost:${process.env.PORT}/file/${file.filename}'`,
      linkForDownload: `localhost:${process.env.PORT}/file/${file.filename}`,
    };
  }

  @Get(':filename')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: storageOptions,
    }),
  )
  @HttpCode(HttpStatus.OK)
  getFile(@Param('filename') filename, @Res() res) {
    try {
      fs.accessSync(path.resolve('./uploads', filename), fs.constants.F_OK);
      res.sendFile(filename, { root: './uploads' });
    } catch (e) {
      throw new NotFoundException(`file '${filename}' not found!`);
    }
  }
}
