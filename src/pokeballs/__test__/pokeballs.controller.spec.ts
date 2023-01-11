import { Test, TestingModule } from '@nestjs/testing';
import { PokeballsController } from '../pokeballs.controller';
import { PokeballsModule } from '../pokeballs.module';
import { Pokeball } from '../model/pokeball.model';
import { getModelToken } from '@nestjs/mongoose';
import { PokeballsService } from '../pokeballs.service';

describe('PokeballsController', () => {
  let controller: PokeballsController;
  let pokeballsService: PokeballsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PokeballsModule],
    })
      .overrideProvider(getModelToken(Pokeball.name))
      .useValue(jest.fn())
      .compile();

    controller = module.get<PokeballsController>(PokeballsController);
    pokeballsService = module.get<PokeballsService>(PokeballsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should be defined', () => {
    expect(pokeballsService).toBeDefined();
  });
});
