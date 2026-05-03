import { IsInt, IsNumber, IsString, Min } from 'class-validator';

export class CreatePagoDto {

  @IsInt()
  venta_id: number;

  @IsString()
  metodo: string; // efectivo, QR

  @IsNumber()
  @Min(0)
  monto: number;
}