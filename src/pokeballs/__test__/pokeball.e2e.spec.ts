import { Test, TestingModule } from '@nestjs/testing';
import {
  NestFastifyApplication,
  FastifyAdapter,
} from '@nestjs/platform-fastify';
import { AppModule } from '../../app.module';

describe('Pokeballs endpoints', () => {
  let app: NestFastifyApplication;
  const pokeballsMock = [
    {
      typePokeball: 'pokeball',
      accuracy: 50,
      imageURL: 'dios',
    },
    {
      typePokeball: 'masterBall',
      accuracy: 50,
      imageURL: 'dios',
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
    describe('update 1 pokeball', () => {
      test('should return 200 ', async () => {
        const { body, statusCode, headers, statusMessage } = await app.inject({
          method: 'POST',
          payload: pokeballsMock[0],
          url: `/pokeballs/create`,
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
    describe('Get all pokeball', () => {
      test('should return 200 ', async () => {
        const { body, statusCode, headers, statusMessage } = await app.inject({
          method: 'GET',
          url: `/pokeballs`,
        });
        expect(statusCode).toEqual(200);
        expect(headers['content-type']).toEqual(
          'application/json; charset=utf-8',
        );
        expect(statusMessage).toEqual('OK');
        expect(JSON.parse(body)).toMatchObject({});
      });
    });

    describe('Get 1 pokeball', () => {
      it('should return 200 ', async () => {
        const response = await app.inject({
          method: 'GET',
          url: '/pokeballs',
        });
        const arrayJson = JSON.parse(response.body);
        const { body, statusCode, headers, statusMessage } = await app.inject({
          method: 'GET',
          url: `/pokeballs/${arrayJson.allPokeballs[0]._id}`,
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
    describe('Edit 1 pokeball', () => {
      test('Should return 200', async () => {
        const response = await app.inject({
          method: 'GET',
          url: '/pokeballs',
        });
        const arrayJson = JSON.parse(response.body);
        const { body, statusCode, headers, statusMessage } = await app.inject({
          method: 'PUT',
          payload: pokeballsMock[1],
          url: `/pokeballs/update/${arrayJson.allPokeballs[0]._id}`,
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

  /*   describe('DELETE', () => {
    describe('Delete All pokeball', () => {
      it('Should return 200', async () => {
        const { body, statusCode, headers, statusMessage } = await app.inject({
          method: 'DELETE',
          url: '/pokeballs/delete/all',
        });
        expect(statusCode).toEqual(200);
        expect(headers['content-type']).toEqual(
          'application/json; charset=utf-8',
        );
        expect(statusMessage).toEqual('OK');
        expect(JSON.parse(body)).toMatchObject({});
      });
    });
  }); */

  afterAll(async () => {
    await app.close();
  });
});
