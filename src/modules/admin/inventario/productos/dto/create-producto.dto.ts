import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsPositive, MinLength, IsBoolean } from "class-validator";

export class CreateProductoDto {

    @ApiProperty()
    @IsNotEmpty()
    @MinLength(3)
    nombre: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    precio: number;

    @ApiProperty()
    @IsOptional()
    @IsBoolean()
    estado?: boolean;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    categoriaId: number;
}