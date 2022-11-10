import { Test, TestingModule } from '@nestjs/testing';
import { PokemonsController } from '../pokemons.controller';
import { PokemonsModule } from '../pokemons.module';
import { Pokemon, PokemonDocument } from '../model/pokemons.model';
import { getModelToken } from '@nestjs/mongoose';
import { PokemonsService } from '../pokemons.service';
import request from 'supertest';
import {
  NestFastifyApplication,
  FastifyAdapter,
} from '@nestjs/platform-fastify';
import { AppModule } from '../../app.module';
import mongoose, { Model } from 'mongoose';

describe('PokemonsController', () => {
  let app: NestFastifyApplication;
  let pokemonModel: Model<PokemonDocument>;
  beforeAll(async () => {
    mongoose.connect('mongodb://10:27017/Poke-test');

    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );
    await app.init();
    await app.getHttpAdapter().getInstance().ready();

    pokemonModel = module.get<Model<PokemonDocument>>(
      getModelToken(Pokemon.name),
    );
  }, 1000);

  //  let controller: PokemonsController;
  //  let pokemonService: PokemonsService;
  //  beforeEach(async () => {
  //    const module: TestingModule = await Test.createTestingModule({
  //      imports: [PokemonsModule],
  //    })
  //      .overrideProvider(getModelToken(Pokemon.name))
  //      .useValue(jest.fn())
  //      .compile();
  //
  //    controller = module.get<PokemonsController>(PokemonsController);
  //    pokemonService = module.get<PokemonsService>(PokemonsService);
  //  });
  //let app: NestFastifyApplication;
  //
  //beforeEach(async () => {
  //  const module = await Test.createTestingModule({
  //    imports: [AppModule],
  //  }).compile();
  //
  //  app = module.createNestApplication<NestFastifyApplication>(
  //    new FastifyAdapter(),
  //  );
  //  await app.init();
  //});
  //
  describe('GET', () => {
    describe('Get all pokemons', () => {
      it('should return 200 ', async () => {
        const { body, statusCode, headers, statusMessage } = await app.inject({
          method: 'GET',
          url: `/pokemons`,
        });
        expect(statusCode).toEqual(200);
        expect(headers['content-type']).toEqual(
          'application/json; charset=utf-8',
        );
        expect(statusMessage).toEqual('OK');
        expect(JSON.parse(body)).toMatchObject({});
      });
    });
  });
  //describe('getPokemons', () => {
  //  test('must return an Array of type Pokemons[]', async () => {
  //    const result = await app.inject({
  //      method: 'GET',
  //      url: '/pokemons',
  //    });
  //    expect(result).toBe(Object);
  //  });
  //});
});
