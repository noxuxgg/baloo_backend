import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Min, MinLength } from "class-validator";

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
    @IsPositive()
    @Min(1)   
    cantidadPersonas: number;

    @ApiProperty({ default: true })
    @IsBoolean()
    @IsOptional()
    estado?: boolean;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    lugarEntrega: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    total: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    adelanto: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    saldo: number;

    @ApiProperty()
    @IsString()
    @IsOptional()
    observaciones: string;
}
