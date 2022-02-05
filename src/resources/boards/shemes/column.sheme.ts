import { ApiProperty } from '@nestjs/swagger';
import { TaskSheme } from 'src/resources/tasks/shemes/task.sheme';

export class ColumnSheme {
  @ApiProperty({
    example: '1d18cbfc-eff1-4a7a-bfbe-4119692c55c7',
    description: 'Column id as UUID',
  })
  id!: string;

  @ApiProperty({ example: 'Column Title', description: 'Column title' })
  title!: string;

  @ApiProperty({ example: 1, description: 'Order column' })
  order!: number;

  @ApiProperty({
    example: [],
    description: 'Array of Tasks',
  })
  tasks!: TaskSheme[];
}
