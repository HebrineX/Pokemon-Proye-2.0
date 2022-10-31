import { Test, TestingModule } from '@nestjs/testing';
import { PokeballsController } from '../pokeballs.controller';
import { PokeballsService } from '../pokeballs.service';

describe('PokeballsController', () => {
  let controller: PokeballsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PokeballsController],
      providers: [PokeballsService],
    }).compile();

    controller = module.get<PokeballsController>(PokeballsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
