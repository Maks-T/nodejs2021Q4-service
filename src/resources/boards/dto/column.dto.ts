import { IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ColumnDto {
  id!: string;

  @ApiProperty({ example: 'Column Title', description: 'Column title' })
  @IsString({ message: 'The column title must be a string' })
  title!: string;

  @ApiProperty({ example: 1, description: 'Order task' })
  @IsInt({ message: 'The column order must be a integer' })
  order!: number;
}
