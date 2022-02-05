import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TaskDto {
  id?: string;

  @ApiProperty({ example: 'Task Title', description: 'Task title' })
  @IsString({ message: 'The task title must be a string' })
  title!: string;

  @ApiProperty({ example: 1, description: 'Task order' })
  @IsNotEmpty({ message: 'The task order name cannot be empty' })
  @IsInt({ message: 'The task order must be a integer' })
  order!: number;

  @ApiProperty({ example: 'Task Description', description: 'Task description' })
  @IsNotEmpty({ message: 'The task description name cannot be empty' })
  @IsString({ message: 'The task description must be a string' })
  description!: string;

  @ApiProperty({
    example: 'fc570e9c-9392-4c4a-bbf8-4e5c64703bd6',
    description: 'UserId UUID or null',
  })
  userId!: string | null;

  @ApiProperty({
    example: 'bb29cb1d-03fc-449b-a576-a08c07e23159',
    description: 'ColumnId UUID or null',
  })
  columnId!: string | null;
}
