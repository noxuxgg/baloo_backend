import {
  IsDateString,
  IsInt,
  IsArray,
  ValidateNested,
  IsNumber,
  Min,
  IsString
} from 'class-validator';
import { Type } from 'class-transformer';

// 🔹 DETALLE DTO
class DetalleDto {

  @IsInt()
  producto_id: number;

  @IsInt()
  @Min(1)
  cantidad: number;

  @IsNumber()
  @Min(0)
  precio_unitario: number;
}

// 🔹 PAGO DTO
class PagoDto {

  @IsString()
  metodo: string;

  @IsNumber()
  @Min(0)
  monto: number;
}

// 🔥 DTO PRINCIPAL
export class CreateVentaDto {

  @IsDateString()
  fecha: string;

  @IsInt()
  usuario_id: number;

  @IsInt()
  sucursal_id: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetalleDto)
  detalles: DetalleDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PagoDto)
  pagos: PagoDto[];
}