import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class TaskDto {
  id?: string;

  @IsString({ message: 'The task title must be a string' })
  title!: string;

  @IsNotEmpty({ message: 'The task order name cannot be empty' })
  @IsInt({ message: 'The task order must be a integer' })
  order!: number;

  @IsNotEmpty({ message: 'The task description name cannot be empty' })
  @IsString({ message: 'The task description must be a string' })
  description!: string;

  userId!: string | null;

  columnId!: string;
}
