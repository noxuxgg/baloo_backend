import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength, MaxLength, IsOptional, IsBoolean } from "class-validator";

export class CreateCategoriaDto {
    @ApiProperty({ description: 'Nombre de la categoría (ej. Tortas, Galletas)' })
    @IsString()
    @MinLength(3)
    @MaxLength(50)
    nombre: string;

    @ApiProperty({ description: 'Breve descripción de la categoría', required: false })
    @IsString()
    @IsOptional()
    @MaxLength(255)
    descripcion?: string;

    @ApiProperty({ description: 'Estado lógico del registro' })
    @IsBoolean()
    @IsOptional()
    estado: boolean;
}