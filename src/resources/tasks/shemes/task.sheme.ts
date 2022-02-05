import { ApiProperty } from '@nestjs/swagger';

export class TaskSheme {
  @ApiProperty({
    example: 'd1734b2a-c52b-47f5-8c0b-8cbede5f740d',
    description: 'Task id as UUID',
  })
  id?: string;

  @ApiProperty({ example: 'Task Title', description: 'Task title' })
  title!: string;

  @ApiProperty({ example: 1, description: 'Task order' })
  order!: number;

  @ApiProperty({ example: 'Task Description', description: 'Task description' })
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

  @ApiProperty({
    example: 'bb29cb1d-03fc-449b-a576-a08c07e23159',
    description: 'ColumnId UUID or null',
  })
  boardId!: string | null;
}
