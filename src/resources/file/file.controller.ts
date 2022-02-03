import {
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

import * as fs from 'fs';
import * as path from 'path';
import storageOptions from './storage.config';
import { ApiTags } from '@nestjs/swagger';
import { FastifyFileInterceptor } from './fastify-files-interceptor';

import * as dotenv from 'dotenv';
import { FileInterceptor as ExpressFileInterceptor } from '@nestjs/platform-express';

dotenv.config({
  path: path.join(__dirname, './../../../.env'),
});

const USE_FASTIFY = process.env.USE_FASTIFY.toLowerCase() === 'true';

const FileInterceptor = USE_FASTIFY
  ? FastifyFileInterceptor
  : ExpressFileInterceptor;

@ApiTags('File')
@Controller('file')
export class FileController {
  @Post('')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: storageOptions,
    })
  )
  upload(@UploadedFile() file) {
    return {
      message: `The ${file.originalname} was successfully uploaded to the server! To download this file, use the link 'localhost:${process.env.PORT}/file/${file.filename}'`,
      linkForDownload: `localhost:${process.env.PORT}/file/${file.filename}`,
    };
  }

  @Get(':filename')
  @HttpCode(HttpStatus.OK)
  getFile(@Param('filename') filename, @Res() res) {
    try {
      const fileRoot = path.resolve('./uploads', filename);
      fs.accessSync(fileRoot, fs.constants.F_OK);

      const file = fs.createReadStream(fileRoot);

      USE_FASTIFY ? res.send(file) : file.pipe(res);
    } catch (e) {
      throw new NotFoundException(`file '${filename}' not found!`);
    }
  }
}
