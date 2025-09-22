// src/admin/users/admin-users.controller.ts
import { Controller, Get, Post, Body, UseGuards, Req, ForbiddenException } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { AdminGuard } from '../../common/guards/admin.guard';
import { AdminUsersService } from './admin-users.service';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AdminUserDto } from './dto/admin-user.dto';
import { CreateAdminUserDto } from './dto/create-admin-user.dto';

@ApiTags('Admin - Users')
@ApiBearerAuth()
@Controller('admin/users')
export class AdminUsersController {
  constructor(private readonly adminUsersService: AdminUsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiOperation({ summary: '모든 관리자 계정 조회' })
  @ApiResponse({ status: 200, type: [AdminUserDto] })
  async findAll(): Promise<AdminUserDto[]> {
    return this.adminUsersService.findAll();
  }

  @Post()
  @ApiOperation({ summary: '새 관리자 계정 생성 (어드민 or 비밀 키 필요)' })
  @ApiResponse({ status: 201, type: AdminUserDto })
  async create(@Body() data: CreateAdminUserDto, @Req() req): Promise<AdminUserDto> {
    const user = req.user; // JwtStrategy.validate에서 반환된 값

    const isLoggedInAdmin = user?.role === 'admin';
    const hasValidSecret =
      process.env.ADMIN_SIGNUP_SECRET && data.secret === process.env.ADMIN_SIGNUP_SECRET;

    if (!isLoggedInAdmin && !hasValidSecret) {
      throw new ForbiddenException('어드민 권한이 필요합니다.');
    }

    return this.adminUsersService.create(data);
  }
}
