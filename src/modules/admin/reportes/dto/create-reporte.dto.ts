import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDateString, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateReporteDto {
    
    @IsNotEmpty()
    @IsString()
    tipo: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsDateString()
    fechaInicio: Date;

    @ApiProperty()
    @IsNotEmpty()
    @IsDateString()
    fechaFin: Date;

    @ApiProperty()
    @IsNotEmpty()
    usuarioId: string;
}
