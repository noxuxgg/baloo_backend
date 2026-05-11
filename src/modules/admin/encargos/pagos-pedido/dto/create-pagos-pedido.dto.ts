import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Min, MinLength } from "class-validator";

export class CreatePagosPedidoDto {
    @ApiProperty({ description: 'Id que proviene de Pedido' })
    @IsNumber()
    @IsNotEmpty()
    pedidoId: number;

    @ApiProperty({ description: 'Efectivo, QR'})
    @IsString()
    @IsNotEmpty()
    metodo: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    @IsPositive({ message: 'El monto debe ser mayor a 0'})
    @Min(1)
    monto: number;

    @ApiProperty()
    @IsDateString()
    @IsNotEmpty()
    fecha: Date;  
}
