import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsOptional, Min } from "class-validator";

export class CreateStockDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    @Min(0)
    cantidad: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    @Min(0)
    stockMinimo: number;

    @ApiProperty()
    @IsOptional()
    @IsBoolean()
    estado?: boolean;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    sucursalId: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    productoId: number;
}