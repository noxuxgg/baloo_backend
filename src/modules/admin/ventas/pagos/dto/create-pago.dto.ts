import { IsInt, IsNumber, IsString, IsIn, Min } from 'class-validator';

export class CreatePagoDto {

  @IsInt()
  ventaId: number;                        // 👈 camelCase

  @IsString()
  @IsIn(['efectivo', 'QR'])               // 👈 solo acepta valores válidos
  metodo: string;

  @IsNumber()
  @Min(0)
  monto: number;
}