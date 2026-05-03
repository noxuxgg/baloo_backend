import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateDetalleTortaDto {

    @ApiProperty({ description: 'Id que proviene de pedido' })
    @IsNumber()
    @IsNotEmpty()
    pedidoId: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    sabor: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    color: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    textoTorta: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    decoracion: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    forma: string;

}
