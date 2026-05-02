import { Module } from '@nestjs/common';
import { PagosPedidoService } from './pagos-pedido.service';
import { PagosPedidoController } from './pagos-pedido.controller';

@Module({
  controllers: [PagosPedidoController],
  providers: [PagosPedidoService],
})
export class PagosPedidoModule {}
