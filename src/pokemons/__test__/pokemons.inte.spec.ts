import { Test, TestingModule } from '@nestjs/testing';
import { PokemonsController } from '../pokemons.controller';
import { PokemonsModule } from '../pokemons.module';
import { Pokemon } from '../model/pokemons.model';
import { getModelToken } from '@nestjs/mongoose';
import { PokemonsService } from '../pokemons.service';

describe('PokemonsController', () => {
  let controller: PokemonsController;
  let pokemonService: PokemonsService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PokemonsModule],
    })
      .overrideProvider(getModelToken(Pokemon.name))
      .useValue(jest.fn())
      .compile();

    controller = module.get<PokemonsController>(PokemonsController);
    pokemonService = module.get<PokemonsService>(PokemonsService);
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should be defined', () => {
    expect(pokemonService).toBeDefined();
  });
});
