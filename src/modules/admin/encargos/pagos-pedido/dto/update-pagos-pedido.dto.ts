import { PartialType } from '@nestjs/swagger';
import { CreatePagosPedidoDto } from './create-pagos-pedido.dto';

export class UpdatePagosPedidoDto extends PartialType(CreatePagosPedidoDto) {}
