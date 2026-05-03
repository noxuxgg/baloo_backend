import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateClienteDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    nombre: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    apellido: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(7)
    @MaxLength(8)
    telefono: string;

    @ApiProperty({ default: true })
    @IsBoolean()
    @IsOptional()
    estado?: boolean;
}
