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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BoardSheme } from './shemes/board.sheme';

@ApiTags('Boards')
@Controller('boards')
@UseGuards(JwtAuthGuard)
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @ApiOperation({ summary: 'Create board' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: BoardSheme,
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body(new ValidationDtoPipe())
    boardDto: BoardDto
  ) {
    return this.boardsService.create(boardDto);
  }

  @ApiOperation({ summary: 'Get all boards' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: [BoardSheme],
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.boardsService.findAll();
  }

  @ApiOperation({ summary: 'Get board by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: BoardSheme,
  })
  @Get(':boardId')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('boardId') boardId: string) {
    return this.boardsService.findOne(boardId);
  }

  @ApiOperation({ summary: 'Update board by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: BoardSheme,
  })
  @Put(':boardId')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('boardId') boardId: string,
    @Body(new ValidationDtoPipe()) boardDto: BoardDto
  ) {
    return this.boardsService.update(boardId, boardDto);
  }

  @ApiOperation({ summary: 'Delete board by id' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':boardId')
  remove(@Param('boardId') boardId: string) {
    return this.boardsService.delete(boardId);
  }
}
