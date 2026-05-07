import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StockService } from './stock.service';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';

@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Post()
  create(@Body() createStockDto: CreateStockDto) {
    return this.stockService.create(createStockDto);
  }

  @Get()
  findAll() {
    return this.stockService.findAll();
  }

  // --- LAS RUTAS ESTÁTICAS EXPLICÍTAS SIEMPRE VAN ARRIBA ---
  @Patch('actualizar-unidades')
  async actualizarUnidades(
    @Body() body: { productoId: number; sucursalId: number; cantidadModificada: number }
  ) {
    return await this.stockService.actualizarUnidades(
      Number(body.productoId), 
      Number(body.sucursalId), 
      Number(body.cantidadModificada)
    );
  }

  // --- LAS RUTAS CON PARÁMETROS DINÁMICOS (:id) VAN ABAJO ---
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stockService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStockDto: UpdateStockDto) {
    return this.stockService.update(+id, updateStockDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stockService.remove(+id);
  }
}