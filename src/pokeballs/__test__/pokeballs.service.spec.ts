import { Test, TestingModule } from '@nestjs/testing';
import { PokeballsService } from '../pokeballs.service';

describe('PokeballsService', () => {
  let service: PokeballsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PokeballsService],
    }).compile();

    service = module.get<PokeballsService>(PokeballsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
