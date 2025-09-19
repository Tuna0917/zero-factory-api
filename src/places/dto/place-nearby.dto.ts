import { ApiProperty } from '@nestjs/swagger';

export class PlaceNearbyDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: '제로웨이스트 카페' })
  name: string;

  @ApiProperty({ example: 'STORE' })
  type: string;

  @ApiProperty({ example: '서울시 어딘가', required: false })
  address?: string;

  @ApiProperty({ example: 123.4, description: '내 위치와의 거리(m), 소수점 1자리까지' })
  distance: number;
}
