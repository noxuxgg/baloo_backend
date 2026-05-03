import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class CreateGastoDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsDateString()
    fecha: Date;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    monto: number;

    @ApiProperty()
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    motivo: string;

    @ApiProperty()
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    personaRecibe: string;

    @ApiProperty()
    @IsNotEmpty()
    usuarioId: string;

    @ApiProperty()
    @IsNotEmpty()
    sucursalId: number;
}
