import { IsInt, IsArray, ValidateNested, IsNumber, IsString, IsIn, Min } from 'class-validator';
import { Type } from 'class-transformer';

class DetalleDto {
  @IsInt()
  productoId: number;                         // camelCase

  @IsInt()
  @Min(1)
  cantidad: number;

  @IsNumber()
  @Min(0)
  precioUnitario: number;                     //  camelCase
}

class PagoDto {
  @IsString()
  @IsIn(['efectivo', 'QR'])                   //  validación de valores
  metodo: string;

  @IsNumber()
  @Min(0)
  monto: number;
}

export class CreateVentaDto {
  @IsInt()
  usuarioId: number;                          // camelCase

  @IsInt()
  sucursalId: number;                         //  camelCase

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetalleDto)
  detalles: DetalleDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PagoDto)
  pagos: PagoDto[];
}