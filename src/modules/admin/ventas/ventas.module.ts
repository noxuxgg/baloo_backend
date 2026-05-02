import { Module } from '@nestjs/common';
import { VentasModule } from './ventas/ventas.module';
import { DetalleVentaModule } from './detalle-venta/detalle-venta.module';
import { PagosModule } from './pagos/pagos.module';

@Module({
  imports: [VentasModule, DetalleVentaModule, PagosModule]
})
export class VentasModule {}
