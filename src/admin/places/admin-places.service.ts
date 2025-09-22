// src/admin/places/admin-places.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePlaceDto, PlaceDto, UpdatePlaceDto } from './dto/place.dto';
import { PlaceType } from '@prisma/client';

@Injectable()
export class AdminPlacesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<PlaceDto[]> {
    const rows = await this.prisma.$queryRaw<
      {
        id: number;
        name: string;
        type: PlaceType;
        address: string | null;
        createdAt: Date;
        updatedAt: Date;
        lat: number;
        lon: number;
      }[]
    >`
      SELECT
        id, name, type, address,
        "createdAt", "updatedAt",
        ST_Y(location::geometry) AS lat,
        ST_X(location::geometry) AS lon
      FROM "Place";
    `;

    return rows.map((r) => ({
      id: r.id,
      name: r.name,
      type: r.type,
      address: r.address ?? undefined,
      latitude: r.lat,
      longitude: r.lon,
      createdAt: r.createdAt,
      updatedAt: r.updatedAt,
    }));
  }

  async create(data: CreatePlaceDto): Promise<PlaceDto> {
    const result = await this.prisma.$queryRaw<
      {
        id: number;
        name: string;
        type: PlaceType;
        address: string | null;
        createdAt: Date;
        updatedAt: Date;
        lat: number;
        lon: number;
      }[]
    >`
      INSERT INTO "Place" (name, type, address, location)
      VALUES (
        ${data.name},
        ${data.type}::"PlaceType",
        ${data.address},
        ST_SetSRID(ST_MakePoint(${data.longitude}, ${data.latitude}), 4326)::geography
      )
      RETURNING id, name, type, address, "createdAt", "updatedAt",
                ST_Y(location::geometry) AS lat,
                ST_X(location::geometry) AS lon;
    `;

    const r = result[0];
    return {
      id: r.id,
      name: r.name,
      type: r.type,
      address: r.address ?? undefined,
      latitude: r.lat,
      longitude: r.lon,
      createdAt: r.createdAt,
      updatedAt: r.updatedAt,
    };
  }

  async update(id: number, data: UpdatePlaceDto): Promise<PlaceDto> {
    return await this.prisma.$transaction(async (tx) => {
      // 1. location 업데이트 (좌표 변경 요청이 있을 때만)
      if (data.latitude !== undefined && data.longitude !== undefined) {
        await tx.$executeRaw`
        UPDATE "Place"
        SET location = ST_SetSRID(ST_MakePoint(${data.longitude}, ${data.latitude}), 4326)::geography
        WHERE id = ${id};
      `;
      }

      // 2. 일반 필드 업데이트
      const place = await tx.place.update({
        where: { id },
        data: {
          name: data.name,
          type: data.type,
          address: data.address,
        },
      });

      // 3. 좌표 읽어오기
      const coords = await tx.$queryRaw<{ lat: number; lon: number }[]>`
      SELECT 
        ST_Y(location::geometry) AS lat,
        ST_X(location::geometry) AS lon
      FROM "Place"
      WHERE id = ${id};
    `;

      return {
        id: place.id,
        name: place.name,
        type: place.type,
        address: place.address ?? undefined,
        latitude: coords[0].lat,
        longitude: coords[0].lon,
        createdAt: place.createdAt,
        updatedAt: place.updatedAt,
      };
    });
  }

  async delete(id: number): Promise<void> {
    const result = await this.prisma.$executeRaw`
      DELETE FROM "Place" WHERE id = ${id};
    `;
    if (result === 0) {
      throw new NotFoundException(`Place with id ${id} not found`);
    }
  }
}
