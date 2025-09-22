import { ApiProperty, PartialType } from '@nestjs/swagger';
import { PlaceType } from '@prisma/client';

export class CreatePlaceDto {
  @ApiProperty({ example: '카이스트 학식당' })
  name: string;

  @ApiProperty({ enum: PlaceType, example: PlaceType.STORE })
  type: PlaceType;

  @ApiProperty({ example: '대전 유성구 대학로 291', required: false })
  address?: string;

  @ApiProperty({ example: 36.3723 })
  latitude: number;

  @ApiProperty({ example: 127.3621 })
  longitude: number;
}

export class UpdatePlaceDto extends PartialType(CreatePlaceDto) {}

export class PlaceDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: '카이스트 학식당' })
  name: string;

  @ApiProperty({ enum: PlaceType, example: PlaceType.STORE })
  type: PlaceType;

  @ApiProperty({ example: '대전 유성구 대학로 291', nullable: true })
  address?: string;

  @ApiProperty({ example: 36.3723 })
  latitude: number;

  @ApiProperty({ example: 127.3621 })
  longitude: number;

  @ApiProperty({ example: '2025-09-22T12:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2025-09-22T12:05:00.000Z' })
  updatedAt: Date;
}
