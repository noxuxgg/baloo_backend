import { Module } from '@nestjs/common';
import { ReportesService } from './reportes.service';
import { ReportesController } from './reportes.controller';
import { Reporte } from './entities/reporte.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from '../usuarios/entities/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reporte, Usuario])],
  controllers: [ReportesController],
  providers: [ReportesService],
})
export class ReportesModule {}
