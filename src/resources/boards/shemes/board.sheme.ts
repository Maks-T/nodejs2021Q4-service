import { ApiProperty } from '@nestjs/swagger';
import { ColumnSheme } from './column.sheme';

export class BoardSheme {
  @ApiProperty({
    example: 'aa25fe8b-f560-479d-ad70-e400cbb82ef6',
    description: 'Board id as UUID',
  })
  id!: string;

  @ApiProperty({ example: 'Board Title', description: 'Board title' })
  title!: string;

  @ApiProperty({
    example: [
      {
        id: '445e4eb2-8af6-4e74-9d02-c420d29086f4',
        title: 'First column',
        order: 1,
        tasks: [],
      },
      {
        id: 'aa25fe8b-f560-479d-ad70-e400cbb82ef6',
        title: 'Second column',
        order: 2,
        tasks: [],
      },
    ],
    description: 'Array of Column',
  })
  columns!: ColumnSheme[];
}
