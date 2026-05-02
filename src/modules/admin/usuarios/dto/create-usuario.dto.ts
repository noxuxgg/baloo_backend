import { IsString, MaxLength, MinLength } from "class-validator";

export class CreateUsuarioDto {

    @IsString()
    @MinLength(4)
    @MaxLength(30)
    nombreUsuario: string;

    @IsString()
    @MinLength(5)
    @MaxLength(200)
    contrasenia: string;

}
