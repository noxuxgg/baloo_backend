import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsInt, Min } from "class-validator";

export class CreateStockDto {
    @ApiProperty({ description: 'Cantidad física en inventario' })
    @IsInt()
    @Min(0)
    cantidad: number;

    @ApiProperty({ description: 'ID del producto asociado' })
    @IsNumber()
    productoId: number;
}