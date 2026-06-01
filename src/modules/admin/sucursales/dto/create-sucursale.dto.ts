import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, MaxLength, MinLength } from "class-validator";

export class CreateSucursaleDto {

    @ApiProperty()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(20)
    nombre: string;

    @ApiProperty()
    @IsNotEmpty()
    @MinLength(10)
    @MaxLength(30)
    direccion: string;
    
    @ApiProperty()
    @IsOptional()
    @MinLength(8)
    @MaxLength(8)
    telefono?: string;
}
