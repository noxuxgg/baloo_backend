import { Test, TestingModule } from '@nestjs/testing';
import { IngresosDiariosService } from './ingresos-diarios.service';

describe('IngresosDiariosService', () => {
  let service: IngresosDiariosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IngresosDiariosService],
    }).compile();

    service = module.get<IngresosDiariosService>(IngresosDiariosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
