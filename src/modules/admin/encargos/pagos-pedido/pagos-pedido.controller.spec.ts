import { Test, TestingModule } from '@nestjs/testing';
import { PagosPedidoController } from './pagos-pedido.controller';
import { PagosPedidoService } from './pagos-pedido.service';

describe('PagosPedidoController', () => {
  let controller: PagosPedidoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PagosPedidoController],
      providers: [PagosPedidoService],
    }).compile();

    controller = module.get<PagosPedidoController>(PagosPedidoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
