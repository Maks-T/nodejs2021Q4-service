import { ColumnDto } from './column.dto';
import { IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class BoardDto {
  id?: string;
  @IsString({ message: 'The board title must be a string' })
  title!: string;
  @ValidateNested({ each: true })
  @Type(() => ColumnDto)
  columns!: ColumnDto[];
}
