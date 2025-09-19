import { Controller, Get, Query } from '@nestjs/common';
import { PlacesService } from './places.service';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { PlaceDto } from './dto/place.dto';
import { PlaceNearbyDto } from './dto/place-nearby.dto';

@ApiTags('places')
@Controller('places')
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}

  @Get()
  @ApiOperation({
    summary: '장소 목록 조회',
    description: '지도에 표시할 장소(매장/시설)를 모두 조회합니다.',
  })
  @ApiResponse({ status: 200, type: [PlaceDto] })
  async getAllPlaces() {
    return this.placesService.getAllPlaces();
  }
  @Get('nearby')
  @ApiQuery({ name: 'lat', type: Number, example: 36.3731 })
  @ApiQuery({ name: 'lng', type: Number, example: 127.362 })
  @ApiQuery({ name: 'radius', type: Number })
  @ApiQuery({ name: 'limit', type: Number, required: false, example: 10 })
  @ApiQuery({ name: 'offset', type: Number, required: false, example: 0 })
  async getPlacesNearby(
    @Query('lat') lat: string,
    @Query('lng') lng: string,
    @Query('radius') radius: string,
    @Query('limit') limit = '10',
    @Query('offset') offset = '0',
  ) {
    return this.placesService.getPlacesNearby(
      Number(lat),
      Number(lng),
      Number(radius),
      Number(limit),
      Number(offset),
    );
  }
}
