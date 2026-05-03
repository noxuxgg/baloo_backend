import { Module } from '@nestjs/common';
import { GastosService } from './gastos.service';
import { GastosController } from './gastos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gasto } from './entities/gasto.entity';
import { Usuario } from '../../admin/usuarios/entities/usuario.entity';
import { Sucursal } from '../../admin/sucursales/entities/sucursale.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Gasto, Usuario, Sucursal])],
  controllers: [GastosController],
  providers: [GastosService],
})
export class GastosModule {}
