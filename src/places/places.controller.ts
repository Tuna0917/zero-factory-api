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
  @ApiOperation({
    summary: '반경 내 장소 조회',
    description: '내 위치(lat/lng) 기준 반경(radius m) 내의 장소를 조회합니다.',
  })
  @ApiQuery({ name: 'lat', type: Number, example: 36.3731 })
  @ApiQuery({ name: 'lng', type: Number, example: 127.362 })
  @ApiQuery({ name: 'radius', type: Number, example: 100, description: '반경 (미터)' })
  @ApiResponse({
    status: 200,
    description: '반경 내 장소 리스트',
    type: [PlaceNearbyDto],
  })
  async getPlacesNearby(
    @Query('lat') lat: string,
    @Query('lng') lng: string,
    @Query('radius') radius: string,
  ) {
    return this.placesService.getPlacesNearby(Number(lat), Number(lng), Number(radius));
  }
}
