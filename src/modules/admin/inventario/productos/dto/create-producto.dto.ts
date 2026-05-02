import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber, MinLength, IsBoolean, IsOptional, IsPositive } from "class-validator";

export class CreateProductoDto {
    @ApiProperty()
    @IsString()
    @MinLength(3)
    nombre: string;

    @ApiProperty()
    @IsNumber()
    @IsPositive()
    precio: number;

    @ApiProperty({ default: true })
    @IsBoolean()
    @IsOptional()
    estado?: boolean;

    @ApiProperty({ description: 'ID de la categoría a la que pertenece' })
    @IsNumber()
    categoriaId: number; 
}