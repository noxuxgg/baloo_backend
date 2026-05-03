import { Module } from '@nestjs/common';
import { DetalleTortaService } from './detalle-torta.service';
import { DetalleTortaController } from './detalle-torta.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetalleTorta } from './entities/detalle-torta.entity';
@Module({
  imports: [TypeOrmModule.forFeature([DetalleTorta])],
  controllers: [DetalleTortaController],
  providers: [DetalleTortaService],
})
export class DetalleTortaModule { }
