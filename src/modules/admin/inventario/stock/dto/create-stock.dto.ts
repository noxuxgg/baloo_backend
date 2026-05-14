import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsInt, Min, IsBoolean, IsOptional } from "class-validator";

export class CreateStockDto {
    @ApiProperty({ description: 'Cantidad física en inventario' })
    @IsInt()
    @Min(0)
    cantidad: number;

    @ApiProperty({ description: 'Stock mínimo para alertas' })
    @IsInt()
    @Min(0)
    stockMinimo: number;

    @ApiProperty({ description: 'Estado lógico del registro' })
    @IsBoolean()
    @IsOptional()
    estado: boolean;

    @ApiProperty({ description: 'ID de la sucursal' })
    @IsNumber()
    sucursalId: number;

    @ApiProperty({ description: 'ID del producto asociado' })
    @IsNumber()
    productoId: number;

}