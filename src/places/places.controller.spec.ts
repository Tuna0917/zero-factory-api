import { Test, TestingModule } from '@nestjs/testing';
import { PlacesController } from './places.controller';
import { PlacesService } from './places.service';

describe('PlacesController', () => {
  let controller: PlacesController;
  let service: PlacesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlacesController],
      providers: [
        {
          provide: PlacesService,
          useValue: {
            getPlacesNearby: jest
              .fn()
              .mockResolvedValue([
                { id: 1, name: '테스트 POI', type: 'STORE', address: '대전', distance: 50.1 },
              ]),
          },
        },
      ],
    }).compile();

    controller = module.get<PlacesController>(PlacesController);
    service = module.get<PlacesService>(PlacesService);
  });

  it('컨트롤러 정의됨', () => {
    expect(controller).toBeDefined();
  });

  it('근처 장소를 조회한다', async () => {
    const result = await controller.getPlacesNearby('36.3731', '127.3620', '100');
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('테스트 POI');
    expect(service.getPlacesNearby).toHaveBeenCalled();
  });
});
