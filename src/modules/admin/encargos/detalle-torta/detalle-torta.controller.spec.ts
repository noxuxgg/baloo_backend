import { Test, TestingModule } from '@nestjs/testing';
import { DetalleTortaController } from './detalle-torta.controller';
import { DetalleTortaService } from './detalle-torta.service';

describe('DetalleTortaController', () => {
  let controller: DetalleTortaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DetalleTortaController],
      providers: [DetalleTortaService],
    }).compile();

    controller = module.get<DetalleTortaController>(DetalleTortaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
