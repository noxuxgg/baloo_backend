import { IsInt, IsArray, IsString, IsUUID, ValidateNested, IsNumber, IsIn, Min } from 'class-validator';
import { Type } from 'class-transformer';

class DetalleDto {
  @IsInt()
  productoId: number;

  @IsInt()
  @Min(1)
  cantidad: number;

  @IsNumber()
  @Min(0)
  precioUnitario: number;
}

class PagoDto {
  @IsString()
  @IsIn(['efectivo', 'QR'])
  metodo: string;

  @IsNumber()
  @Min(0)
  monto: number;
}

export class CreateVentaDto {
  @IsUUID()                                   
  usuarioId: string;                          

  @IsInt()
  sucursalId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetalleDto)
  detalles: DetalleDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PagoDto)
  pagos: PagoDto[];
}