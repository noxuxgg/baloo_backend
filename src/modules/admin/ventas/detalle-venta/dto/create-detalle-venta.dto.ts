// create-detalle-venta.dto.ts
import { IsInt, IsNumber, Min } from 'class-validator';

export class CreateDetalleVentaDto {
  @IsInt()
  ventaId: number;        // camelCase

  @IsInt()
  productoId: number;     // camelCase

  @IsInt()
  @Min(1)
  cantidad: number;

  @IsNumber()
  @Min(0)
  precioUnitario: number; //camelCase
}