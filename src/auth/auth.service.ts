import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateAdmin(email: string, password: string) {
    const admin = await this.prisma.adminUser.findUnique({ where: { email } });
    if (!admin) throw new UnauthorizedException('잘못된 자격 증명입니다.');

    const isValid = await bcrypt.compare(password, admin.password);
    if (!isValid) throw new UnauthorizedException('잘못된 자격 증명입니다.');

    return { id: admin.id, email: admin.email, role: admin.role };
  }

  async login(admin: { id: number; email: string; role: string }) {
    const payload = { sub: admin.id, email: admin.email, role: admin.role };
    return { access_token: this.jwtService.sign(payload) };
  }
}
