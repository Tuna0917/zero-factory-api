// src/admin/places/admin-places.controller.ts
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { AdminGuard } from '../../common/guards/admin.guard';
import { AdminPlacesService } from './admin-places.service';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreatePlaceDto, PlaceDto, UpdatePlaceDto } from './dto/place.dto';

@ApiTags('Admin - Places')
@ApiBearerAuth()
@Controller('admin/places')
@UseGuards(JwtAuthGuard, AdminGuard)
export class AdminPlacesController {
  constructor(private readonly adminPlacesService: AdminPlacesService) {}

  @Get()
  @ApiOperation({ summary: '모든 장소 조회' })
  @ApiResponse({ status: 200, type: [PlaceDto] })
  async findAll(): Promise<PlaceDto[]> {
    return this.adminPlacesService.findAll();
  }

  @Post()
  @ApiOperation({ summary: '새 장소 등록' })
  @ApiResponse({ status: 201, type: PlaceDto })
  async create(@Body() data: CreatePlaceDto): Promise<PlaceDto> {
    return this.adminPlacesService.create(data);
  }

  @Patch(':id')
  @ApiOperation({ summary: '장소 수정' })
  @ApiResponse({ status: 200, type: PlaceDto })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdatePlaceDto,
  ): Promise<PlaceDto> {
    return this.adminPlacesService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: '장소 삭제' })
  @ApiResponse({ status: 204, description: '삭제 성공' })
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.adminPlacesService.delete(id);
  }
}
