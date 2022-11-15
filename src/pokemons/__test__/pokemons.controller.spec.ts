import { Test, TestingModule } from '@nestjs/testing';
import { PokemonsController } from '../pokemons.controller';
import { PokemonsModule } from '../pokemons.module';
import { Pokemon, PokemonDocument } from '../model/pokemons.model';
import { getModelToken } from '@nestjs/mongoose';
import { PokemonsService } from '../pokemons.service';

import {
  NestFastifyApplication,
  FastifyAdapter,
} from '@nestjs/platform-fastify';
import { AppModule } from '../../app.module';
import * as dotenv from 'dotenv';
dotenv.config();
import config from '../../config/index';
import { CreatePokemonDTO } from '../dto/pokemon.dto';
import { pokeType } from '../pokeType';
import { ObjectID } from 'bson';

describe('PokemonsController', () => {
  let app: NestFastifyApplication;
  const inicialPokemons = [
    {
      name: 'Bulbasaur',
      pokedexId: 1,
      type: [pokeType.GRASS, pokeType.POISON],
      imageURL: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png`,
      level: 1,
    },
    {
      name: 'Ivysaur',
      pokedexId: 2,
      type: [pokeType.GRASS, pokeType.POISON],
      imageURL: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/002.png`,
      level: 1,
    },
    {
      name: 'Venusaur',
      pokedexId: 3,
      type: [pokeType.GRASS, pokeType.POISON],
      imageURL: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/003.png`,
      level: 1,
    },
  ];

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );
    await app.init();

    await app.getHttpAdapter().getInstance().ready();
  });

  describe('POST', () => {
    describe('update 1 Pokemon', () => {
      test('should return 200 ', async () => {
        const { body, statusCode, headers, statusMessage } = await app.inject({
          method: 'POST',
          payload: inicialPokemons[0],
          url: `/pokemons/create`,
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
  describe('GET', () => {
    describe('Get all pokemons', () => {
      test('should return 200 ', async () => {
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

    describe('Get 1 pokemons', () => {
      it('should return 200 ', async () => {
        const response = await app.inject({
          method: 'GET',
          url: '/pokemons',
        });
        const arrayJson = JSON.parse(response.body);

        const { body, statusCode, headers, statusMessage } = await app.inject({
          method: 'GET',
          url: `/pokemons/${arrayJson.pokemons[0]._id}`,
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
  describe('DELETE', () => {
    describe('Delete All Pokemons', () => {
      it('Should return 200', async () => {
        const { body, statusCode, headers, statusMessage } = await app.inject({
          method: 'DELETE',
          url: '/pokemons/delete/all',
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

  afterAll(async () => {
    await app.close();
  });
});
