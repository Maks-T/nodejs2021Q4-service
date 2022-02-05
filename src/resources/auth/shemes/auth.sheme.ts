import { ApiProperty } from '@nestjs/swagger';

export class AuthSheme {
  @ApiProperty({
    example: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJmYzU3MGU5Yy05MzkyLTRjNGEtYmJmOC00ZTVjNjQ3MDNiZDYiLCJsb2dpbiI6ImFkbWluIiwiaWF0IjoxNjQzODIyMDk0LCJleHAiOjE2NDM5MDg0OTR9.EXfpyAmv63iouAgAElS-xgLNwsh0S4IVlKhtLp40GCs`,
    description: 'Get token',
  })
  token!: string;
}
