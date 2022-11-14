import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { GymsController } from '../gyms.controller';
import { GymsModule } from '../gyms.module';
import { GymsService } from '../gyms.service';
import { Gym } from '../model/gym.model';

describe('GymsController', () => {
  let controller: GymsController;
  let gymService: GymsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [GymsModule],
    })
      .overrideProvider(getModelToken(Gym.name))
      .useValue(jest.fn())
      .compile();

    controller = module.get<GymsController>(GymsController);
    gymService = module.get<GymsService>(GymsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
