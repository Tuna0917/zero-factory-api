import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PlaceNearbyDto } from './dto/place-nearby.dto';

@Injectable()
export class PlacesService {
  constructor(private prisma: PrismaService) {}

  async getAllPlaces() {
    return this.prisma.place.findMany({
      include: { store: true }, // 매장이면 store 정보까지
    });
  }

  async getPlacesNearby(lat: number, lng: number, radiusMeters: number) {
    return this.prisma.$queryRawUnsafe<PlaceNearbyDto[]>(`
      SELECT id, name, type, address,
             ST_Distance(
               ST_MakePoint(${lng}, ${lat})::geography,
               "location"
             ) AS distance
      FROM "Place"
      WHERE ST_DWithin(
        "location",
        ST_MakePoint(${lng}, ${lat})::geography,
        ${radiusMeters}
      )
      ORDER BY distance ASC;
    `);
  }
}
