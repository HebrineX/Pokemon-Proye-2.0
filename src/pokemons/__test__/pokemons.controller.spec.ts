import { Test, TestingModule } from '@nestjs/testing';
import { PokemonsController } from '../pokemons.controller';
import { PokemonsModule } from '../pokemons.module';
import { Pokemon, PokemonDocument } from '../model/pokemons.model';
import { getModelToken } from '@nestjs/mongoose';
import { PokemonsService } from '../pokemons.service';
import request from 'supertest';

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

  describe('getPokemons', () => {
    test('should respond whit a 200 status code ', async () => {
      await request().get('/pokemons').send().expect(200);
    });
    //  it('must return an Array of type Pokemons[]', async () => {
    //    jest
    //      .spyOn(pokemonService, 'getPokemons')
    //      .mockImplementation(() =>
    //        Promise.resolve([{}] as unknown as Promise<PokemonDocument[]>),
    //      );
    //    const result = await controller.getPokemons(undefined);
    //
    //    expect(result).toHaveLength(1);
    //    expect(pokemonService.getPokemons).toHaveBeenCalledTimes(1);
    //  });
  });
});
