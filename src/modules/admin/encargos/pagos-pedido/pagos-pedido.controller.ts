import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PagosPedidoService } from './pagos-pedido.service';
import { CreatePagosPedidoDto } from './dto/create-pagos-pedido.dto';
import { UpdatePagosPedidoDto } from './dto/update-pagos-pedido.dto';

@Controller('pagos-pedido')
export class PagosPedidoController {
  constructor(private readonly pagosPedidoService: PagosPedidoService) {}

  @Post()
  create(@Body() createPagosPedidoDto: CreatePagosPedidoDto) {
    return this.pagosPedidoService.create(createPagosPedidoDto);
  }

  @Get()
  findAll() {
    return this.pagosPedidoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pagosPedidoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePagosPedidoDto: UpdatePagosPedidoDto) {
    return this.pagosPedidoService.update(+id, updatePagosPedidoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pagosPedidoService.remove(+id);
  }
}
