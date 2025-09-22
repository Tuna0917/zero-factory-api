import { ApiProperty } from '@nestjs/swagger';

export class AdminUserDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'admin@example.com' })
  email: string;

  @ApiProperty({ example: 'admin' })
  role: string;
}
