import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateClienteDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(50)
    @Matches(/^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(\s[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)*$/, {
        message: 'El nombre debe empezar con mayúscula y no contener números'
    })
    nombre: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(50)
    @Matches(/^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(\s[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)*$/, {
        message: 'El apellido debe empezar con mayúscula y no contener números'
    })
    apellido: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(7)
    @MaxLength(8)
    @Matches(/^[0-9]+$/, {
        message: 'El telefono solo debe contener numeros'
    })
    telefono: string;

    @ApiProperty({ default: true })
    @IsBoolean()
    @IsOptional()
    estado?: boolean;
}
