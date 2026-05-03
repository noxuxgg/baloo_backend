import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class CreateIngresosDiarioDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsDateString()
    fecha: Date;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    total: number;

    @ApiProperty()
    @IsOptional()
    @IsString()
    observaciones: string;

    @ApiProperty()
    @IsNotEmpty()
    usuarioId: string;

    @ApiProperty()
    @IsNotEmpty()
    sucursalId: number;

}
