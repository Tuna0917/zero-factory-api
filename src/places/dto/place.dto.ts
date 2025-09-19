import { ApiProperty } from '@nestjs/swagger';

export class PlaceDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: '제로웨이스트 카페' })
  name: string;

  @ApiProperty({ example: 'STORE', description: '장소 유형 (STORE/FACILITY)' })
  type: string;

  @ApiProperty({ example: 37.123 })
  latitude: number;

  @ApiProperty({ example: 127.456 })
  longitude: number;

  @ApiProperty({ example: '서울특별시 강남구 어딘가 123', required: false })
  address?: string;

  @ApiProperty({ example: '텀블러 사용시 500원 할인', required: false })
  description?: string;
}
