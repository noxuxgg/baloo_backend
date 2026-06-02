import { IsInt, IsNumber, IsString, IsIn, Min } from 'class-validator';

export class CreatePagoDto {

  @IsInt()
  ventaId: number;                        

  @IsString()
  @IsIn(['efectivo', 'QR'])            
  metodo: string;

  @IsNumber()
  @Min(0)
  monto: number;
}