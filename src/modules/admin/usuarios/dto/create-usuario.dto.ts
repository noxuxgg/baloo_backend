import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUsuarioDto {

    @ApiProperty()
    @IsString()
    @MinLength(4)
    @MaxLength(30)
    nombreUsuario: string;

    @ApiProperty()
    @IsString()
    @MinLength(5)
    @MaxLength(255)
    contrasenia: string;

    @ApiProperty()
    @IsOptional()
    @IsArray()
    roleIds?: number[]
}
