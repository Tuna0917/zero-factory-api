import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AdminUserDto } from './dto/admin-user.dto';
import { CreateAdminUserDto } from './dto/create-admin-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminUsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<AdminUserDto[]> {
    return this.prisma.adminUser.findMany({
      select: { id: true, email: true, role: true },
    });
  }

  async create(data: CreateAdminUserDto): Promise<AdminUserDto> {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.prisma.adminUser.create({
      data: {
        email: data.email,
        password: hashedPassword,
        role: data.role ?? 'admin',
      },
      select: { id: true, email: true, role: true },
    });

    return user;
  }
}
