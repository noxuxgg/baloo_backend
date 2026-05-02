import { IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class inicioSesionDto{
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(30)
    nombreUsuario: string;
    
    @MinLength(6)
    @MaxLength(255)
    contrasenia: string;
}