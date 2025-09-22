import { ApiProperty } from '@nestjs/swagger';

export class CreateAdminUserDto {
  @ApiProperty({ example: 'newadmin@example.com' })
  email: string;

  @ApiProperty({ example: 'securePassword123' })
  password: string;

  @ApiProperty({ example: 'admin', required: false })
  role?: string;

  @ApiProperty({ example: 'my-secret-key', description: '관리자 등록용 비밀 키' })
  secret?: string;
}
