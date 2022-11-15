import { Test, TestingModule } from '@nestjs/testing';
import {
  NestFastifyApplication,
  FastifyAdapter,
} from '@nestjs/platform-fastify';
import { AppModule } from '../../app.module';

describe('gymController', () => {
  let app: NestFastifyApplication;
  const gymsMock = [
    {
      city: 'string',
      typeMedall: 'sah',
      leader: 'dios',
      imageMedall: 'xd',
      recruits: [],
    },
    {
      city: 'string2',
      typeMedall: 'sah2',
      leader: 'dios2',
      imageMedall: 'xd',
      recruits: [],
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
    describe('update 1 gym', () => {
      test('should return 200 ', async () => {
        const { body, statusCode, headers, statusMessage } = await app.inject({
          method: 'POST',
          payload: gymsMock[0],
          url: `/gyms/create`,
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
    describe('Get all gym', () => {
      test('should return 200 ', async () => {
        const { body, statusCode, headers, statusMessage } = await app.inject({
          method: 'GET',
          url: `/gyms`,
        });
        console.log(body);
        expect(statusCode).toEqual(200);
        expect(headers['content-type']).toEqual(
          'application/json; charset=utf-8',
        );
        expect(statusMessage).toEqual('OK');
        expect(JSON.parse(body)).toMatchObject({});
      });
    });

    describe('Get 1 gym', () => {
      it('should return 200 ', async () => {
        const response = await app.inject({
          method: 'GET',
          url: '/gyms',
        });
        const arrayJson = JSON.parse(response.body);
        console.log(arrayJson);
        const { body, statusCode, headers, statusMessage } = await app.inject({
          method: 'GET',
          url: `/gyms/${arrayJson.gyms[0]._id}`,
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
    describe('Edit 1 gym', () => {
      test('Should return 200', async () => {
        const response = await app.inject({
          method: 'GET',
          url: '/gyms',
        });
        const arrayJson = JSON.parse(response.body);
        const { body, statusCode, headers, statusMessage } = await app.inject({
          method: 'PUT',
          payload: gymsMock[1],
          url: `/gyms/update/${arrayJson.gyms[0]._id}`,
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
    describe('Delete All gym', () => {
      it('Should return 200', async () => {
        const { body, statusCode, headers, statusMessage } = await app.inject({
          method: 'DELETE',
          url: '/gyms/delete/all',
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
