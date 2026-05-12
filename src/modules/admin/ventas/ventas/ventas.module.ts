import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VentasService } from './ventas.service';
import { VentasController } from './ventas.controller';
import { Venta } from './entities/venta.entity';
import { DetalleVenta } from '../detalle-venta/entities/detalle-venta.entity';
import { Pago } from '../pagos/entities/pago.entity';
import { Stock } from '../../inventario/stock/entities/stock.entity'; // agregar

@Module({
  imports: [TypeOrmModule.forFeature([Venta, DetalleVenta, Pago, Stock])], // agregar Stock
  controllers: [VentasController],
  providers: [VentasService],
  exports: [VentasService],
})
export class VentasModule {}