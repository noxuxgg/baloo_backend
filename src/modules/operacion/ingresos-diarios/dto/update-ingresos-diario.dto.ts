import { PartialType } from '@nestjs/swagger';
import { CreateIngresosDiarioDto } from './create-ingresos-diario.dto';

export class UpdateIngresosDiarioDto extends PartialType(CreateIngresosDiarioDto) {}
