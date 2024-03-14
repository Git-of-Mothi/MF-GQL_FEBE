import { Test, TestingModule } from '@nestjs/testing';
import { DataResolver } from './data.resolver';

describe('DataResolver', () => {
  let resolver: DataResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataResolver],
    }).compile();

    resolver = module.get<DataResolver>(DataResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
