import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginDto, LoginResponseDto } from './dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({
    summary: '관리자 로그인',
    description: 'AdminUser 이메일/비밀번호로 로그인하여 JWT 발급',
  })
  @ApiResponse({ status: 200, type: LoginResponseDto })
  async login(@Body() body: LoginDto): Promise<LoginResponseDto> {
    const admin = await this.authService.validateAdmin(body.email, body.password);
    return this.authService.login(admin);
  }
}
