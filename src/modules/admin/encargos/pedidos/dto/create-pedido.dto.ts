import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from "class-validator";

export class CreatePedidoDto {
    @ApiProperty({ description: 'Id que proviene de Cliente' })
    @IsNumber()
    @IsNotEmpty()
    clienteId: number;

    @ApiProperty({ description: 'Id que proviene de Usuario'})
    @IsString()
    @IsNotEmpty()
    usuarioId: string;

    @ApiProperty({ description: 'Id que proviene de Sucursal'})
    @IsNumber()
    @IsNotEmpty()
    sucursalId: number;

    @ApiProperty()
    @IsDateString()
    @IsNotEmpty()
    fechaPedido: Date;

    @ApiProperty()
    @IsDateString()
    @IsNotEmpty()
    fechaEntrega: Date;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    horaEntrega: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    cantidadPersonas: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    estado: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    lugarEntrega: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    total: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    adelanto: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    saldo: number;

    @ApiProperty()
    @IsString()
    observaciones: string;
}
