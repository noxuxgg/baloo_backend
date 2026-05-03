import { Module } from '@nestjs/common';
import { IngresosDiariosService } from './ingresos-diarios.service';
import { IngresosDiariosController } from './ingresos-diarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngresosDiario } from './entities/ingresos-diario.entity';
import { Usuario } from '../../admin/usuarios/entities/usuario.entity';
import { Sucursal } from '../../admin/sucursales/entities/sucursale.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IngresosDiario, Usuario, Sucursal])],
  controllers: [IngresosDiariosController],
  providers: [IngresosDiariosService],
})
export class IngresosDiariosModule {}
