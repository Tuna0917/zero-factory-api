import { Module } from '@nestjs/common';
import { AdminUsersController } from './users/admin-users.controller';
import { AdminUsersService } from './users/admin-users.service';
import { AdminPlacesController } from './places/admin-places.controller';
import { AdminPlacesService } from './places/admin-places.service';

@Module({
  controllers: [AdminUsersController, AdminPlacesController],
  providers: [AdminUsersService, AdminPlacesService],
})
export class AdminModule {}
