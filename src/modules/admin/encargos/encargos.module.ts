import { Module } from '@nestjs/common';
import { ClientesModule } from './clientes/clientes.module';
import { DetalleTortaModule } from './detalle-torta/detalle-torta.module';
import { PagosPedidoModule } from './pagos-pedido/pagos-pedido.module';
import { PedidosModule } from './pedidos/pedidos.module';

@Module({
  imports: [ClientesModule, DetalleTortaModule, PagosPedidoModule, PedidosModule]
})
export class EncargosModule {}
