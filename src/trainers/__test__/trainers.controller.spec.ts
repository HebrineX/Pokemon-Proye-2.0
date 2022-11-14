import { Test, TestingModule } from '@nestjs/testing';
import { TrainersController } from '../trainers.controller';
import { getModelToken } from '@nestjs/mongoose';
import { Trainer } from '../model/trainer.model';
import { TrainersModule } from '../trainers.module';
import { TrainersService } from '../trainers.service';
import { async } from 'rxjs';

describe('TrainersController', () => {
  let controller: TrainersController;
  let trainerService: TrainersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TrainersModule],
    })
      .overrideProvider(getModelToken(Trainer.name))
      .useValue(jest.fn())
      .compile();

    controller = module.get<TrainersController>(TrainersController);
    trainerService = module.get<TrainersService>(TrainersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
