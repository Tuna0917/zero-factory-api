import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PlacesModule } from '../places/places.module';
import { MembersModule } from '../members/members.module';
import { PrismaModule } from '../prisma/prisma.module';
@Module({
  imports: [ConfigModule, PlacesModule, MembersModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
