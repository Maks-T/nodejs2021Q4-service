import { ApiProperty } from '@nestjs/swagger';

export class UserSheme {
  @ApiProperty({
    example: '687a13d9-c1e9-4348-adb8-8f7280b901e9',
    description: 'UserId as UUID',
  })
  id: string;

  @ApiProperty({ example: 'Maxim', description: 'User name' })
  name: string;

  @ApiProperty({ example: 'Max-T', description: 'Unique login of the user' })
  login!: string;
}
