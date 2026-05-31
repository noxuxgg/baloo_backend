import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, Matches, Max, MaxLength, Min, MinLength } from "class-validator";

export class CreateClienteDto {
    @ApiProperty()
    @IsInt()
    @Min(10000)
    @Max(9999999999)
    carnet: number;

    @ApiProperty({required: false})
    @IsString()
    @IsOptional()
    @MaxLength(2)
    @Matches(/^[0-9A-ZÑa-zñ]{0,2}$/, {
        message:'El complemento solo debe contener letras o números de hasta 2 caracteres y sin espacios'
    })
    complemento: string;

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

    @ApiProperty()
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
