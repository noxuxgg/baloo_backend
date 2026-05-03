import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from "class-validator";

export class CreatePagosPedidoDto {
    @ApiProperty({ description: 'Id que proviene de Pedido' })
    @IsNumber()
    @IsNotEmpty()
    pedidoId: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    metodo: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    monto: number;

    @ApiProperty()
    @IsDateString()
    @IsNotEmpty()
    fecha: Date;  
}
