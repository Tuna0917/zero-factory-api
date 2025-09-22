import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { PlacesModule } from '../places/places.module';
import { MembersModule } from '../members/members.module';
import { PrismaModule } from '../prisma/prisma.module';
import { AdminModule } from 'src/admin/admin.module';
import { AuthModule } from 'src/auth/auth.module';
@Module({
  imports: [ConfigModule, PlacesModule, MembersModule, PrismaModule, AuthModule, AdminModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
