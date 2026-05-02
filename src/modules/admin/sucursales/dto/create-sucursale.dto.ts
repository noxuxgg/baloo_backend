import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, MaxLength, MinLength } from "class-validator";

export class CreateSucursaleDto {

    @ApiProperty()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(20)
    nombre: string;

    @ApiProperty()
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(50)
    direccion: string;
    
    @ApiProperty()
    @IsOptional()
    @MinLength(5)
    @MaxLength(10)
    telefono?: string;
}
