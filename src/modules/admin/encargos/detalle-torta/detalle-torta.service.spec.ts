import { Test, TestingModule } from '@nestjs/testing';
import { DetalleTortaService } from './detalle-torta.service';

describe('DetalleTortaService', () => {
  let service: DetalleTortaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DetalleTortaService],
    }).compile();

    service = module.get<DetalleTortaService>(DetalleTortaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
