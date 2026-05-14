import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsOptional, MaxLength, MinLength } from "class-validator";

export class CreateCategoriaDto {

    @ApiProperty()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(50)
    nombre: string;

    @ApiProperty()
    @IsOptional()
    @MaxLength(255)
    descripcion?: string;

    @ApiProperty()
    @IsOptional()
    @IsBoolean()
    estado?: boolean; 
}