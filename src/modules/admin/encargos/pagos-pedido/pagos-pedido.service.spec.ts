import { Test, TestingModule } from '@nestjs/testing';
import { PagosPedidoService } from './pagos-pedido.service';

describe('PagosPedidoService', () => {
  let service: PagosPedidoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PagosPedidoService],
    }).compile();

    service = module.get<PagosPedidoService>(PagosPedidoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
