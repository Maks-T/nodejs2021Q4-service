import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ValidationDtoPipe } from 'src/pipes/validation.dto.pipe';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { BoardsService } from './boards.service';
import { BoardDto } from './dto/board.dto';

@Controller('boards')
@UseGuards(JwtAuthGuard)
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body(new ValidationDtoPipe())
    boardDto: BoardDto,
  ) {
    return this.boardsService.create(boardDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.boardsService.findAll();
  }

  @Get(':boardId')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('boardId') boardId: string) {
    return this.boardsService.findOne(boardId);
  }

  @Put(':boardId')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('boardId') boardId: string,
    @Body(new ValidationDtoPipe()) boardDto: BoardDto,
  ) {
    return this.boardsService.update(boardId, boardDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':boardId')
  remove(@Param('boardId') boardId: string) {
    return this.boardsService.delete(boardId);
  }
}
