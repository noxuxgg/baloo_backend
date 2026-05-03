import { IsInt, IsNumber, Min } from 'class-validator';

export class CreateDetalleVentaDto {

  @IsInt()
  venta_id: number;

  @IsInt()
  producto_id: number;

  @IsInt()
  @Min(1)
  cantidad: number;

  @IsNumber()
  @Min(0)
  precio_unitario: number;

  @IsNumber()
  @Min(0)
  subtotal: number;
}