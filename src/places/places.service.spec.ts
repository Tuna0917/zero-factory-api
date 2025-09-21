import { Test, TestingModule } from '@nestjs/testing';
import { PlacesService } from './places.service';
import { PrismaService } from '../prisma/prisma.service';

describe('PlacesService', () => {
  let service: PlacesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlacesService, PrismaService],
    }).compile();

    service = module.get<PlacesService>(PlacesService);
  });

  it('서비스 정의됨', () => {
    expect(service).toBeDefined();
  });
});
