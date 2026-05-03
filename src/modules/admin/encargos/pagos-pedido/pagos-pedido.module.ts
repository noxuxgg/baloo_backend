import { Module } from '@nestjs/common';
import { PagosPedidoService } from './pagos-pedido.service';
import { PagosPedidoController } from './pagos-pedido.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PagosPedido } from './entities/pagos-pedido.entity';
@Module({
  imports: [TypeOrmModule.forFeature([PagosPedido])],
  controllers: [PagosPedidoController],
  providers: [PagosPedidoService],
})
export class PagosPedidoModule {}
