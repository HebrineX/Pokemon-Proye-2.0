import { Test, TestingModule } from '@nestjs/testing';
import {
  NestFastifyApplication,
  FastifyAdapter,
} from '@nestjs/platform-fastify';
import { AppModule } from '../../app.module';

describe('trainerController', () => {
  let app: NestFastifyApplication;
  const trainersMock = [
    {
      name: 'string',
      medalls: [],
      team: [],
      pokeballs: 10,
      pokedexCompleted: [],
      pokemonTrunk: [],
    },
    {
      name: 'string2',
      medalls: [],
      team: [],
      pokeballs: 10,
      pokedexCompleted: [],
      pokemonTrunk: [],
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
    describe('update 1 trainer', () => {
      test('should return 200 ', async () => {
        const { body, statusCode, headers, statusMessage } = await app.inject({
          method: 'POST',
          payload: trainersMock[0],
          url: `/trainers/create`,
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
    describe('Get all trainer', () => {
      test('should return 200 ', async () => {
        const { body, statusCode, headers, statusMessage } = await app.inject({
          method: 'GET',
          url: `/trainers`,
        });
        expect(statusCode).toEqual(200);
        expect(headers['content-type']).toEqual(
          'application/json; charset=utf-8',
        );
        expect(statusMessage).toEqual('OK');
        expect(JSON.parse(body)).toMatchObject({});
      });
    });

    describe('Get 1 trainer', () => {
      it('should return 200 ', async () => {
        const response = await app.inject({
          method: 'GET',
          url: '/trainers',
        });
        const arrayJson = JSON.parse(response.body);
        const { body, statusCode, headers, statusMessage } = await app.inject({
          method: 'GET',
          url: `/trainers/${arrayJson.trainers[0]._id}`,
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

  describe('PUT', () => {
    describe('Edit 1 trainer', () => {
      test('Should return 200', async () => {
        const response = await app.inject({
          method: 'GET',
          url: '/trainers',
        });
        const arrayJson = JSON.parse(response.body);
        const { body, statusCode, headers, statusMessage } = await app.inject({
          method: 'PUT',
          payload: trainersMock[1],
          url: `/trainers/update/${arrayJson.trainers[0]._id}`,
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
    describe('Delete All trainer', () => {
      it('Should return 200', async () => {
        const { body, statusCode, headers, statusMessage } = await app.inject({
          method: 'DELETE',
          url: '/trainers/delete/all',
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
