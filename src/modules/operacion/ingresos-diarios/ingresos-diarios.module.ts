import { Module } from '@nestjs/common';
import { IngresosDiariosService } from './ingresos-diarios.service';
import { IngresosDiariosController } from './ingresos-diarios.controller';

@Module({
  controllers: [IngresosDiariosController],
  providers: [IngresosDiariosService],
})
export class IngresosDiariosModule {}
