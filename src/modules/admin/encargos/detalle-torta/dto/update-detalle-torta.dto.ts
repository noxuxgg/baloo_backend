import { PartialType } from '@nestjs/swagger';
import { CreateDetalleTortaDto } from './create-detalle-torta.dto';

export class UpdateDetalleTortaDto extends PartialType(CreateDetalleTortaDto) {}
