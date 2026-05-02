import { Module } from '@nestjs/common';
import { DetalleTortaService } from './detalle-torta.service';
import { DetalleTortaController } from './detalle-torta.controller';

@Module({
  controllers: [DetalleTortaController],
  providers: [DetalleTortaService],
})
export class DetalleTortaModule {}
