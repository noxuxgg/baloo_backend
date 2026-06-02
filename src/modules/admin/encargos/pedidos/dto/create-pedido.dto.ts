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

    @ApiProperty({ description: 'Estado de entrega: 1=Pendiente, 2=Entregado, 3=En preparación, 4=Anulado', default: 1 })
    @IsNumber()
    @Min(1)
    @IsNotEmpty()
    estadoEntrega: number;

    @ApiProperty({ description: 'Estado del pago: 1=Pendiente (Sin adelanto), 2=Pago Parcial (Con adelanto), 3=Pago Completo', default: 1 })
    @IsNumber()
    @Min(1)
    @IsNotEmpty()
    estadoPago: number;

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
