import { IsInt, IsString } from 'class-validator';

export class ColumnDto {
  id!: string;
  @IsString({ message: 'The column title must be a string' })
  title!: string;

  @IsInt({ message: 'The column order must be a integer' })
  order!: number;
}
