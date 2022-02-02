import { IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ColumnDto } from './column.dto';
import { ApiProperty } from '@nestjs/swagger';

export class BoardDto {
  id?: string;

  @ApiProperty({ example: 'Board Title', description: 'Board title' })
  @IsString({ message: 'The board title must be a string' })
  title!: string;

  @ApiProperty({
    example: [
      { title: 'First column', order: 1 },
      { title: 'Second column', order: 2 },
    ],
    description: 'Array of Column',
  })
  @ValidateNested({ each: true })
  @Type(() => ColumnDto)
  columns!: ColumnDto[];
}
