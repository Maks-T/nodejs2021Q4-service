import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class AuthInvalidSheme {
  @ApiProperty({
    example: HttpStatus.FORBIDDEN,
    description: 'HttpStatus FORBIDDEN',
  })
  statusCode: number;
  @ApiProperty({
    example: 'Invalid login or password',
    description: 'Invalid login or password',
  })
  message: string;
}
