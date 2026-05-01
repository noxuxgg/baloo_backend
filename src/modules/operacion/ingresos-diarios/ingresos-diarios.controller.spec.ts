import { Test, TestingModule } from '@nestjs/testing';
import { IngresosDiariosController } from './ingresos-diarios.controller';
import { IngresosDiariosService } from './ingresos-diarios.service';

describe('IngresosDiariosController', () => {
  let controller: IngresosDiariosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IngresosDiariosController],
      providers: [IngresosDiariosService],
    }).compile();

    controller = module.get<IngresosDiariosController>(IngresosDiariosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
