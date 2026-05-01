import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IngresosDiariosService } from './ingresos-diarios.service';
import { CreateIngresosDiarioDto } from './dto/create-ingresos-diario.dto';
import { UpdateIngresosDiarioDto } from './dto/update-ingresos-diario.dto';

@Controller('ingresos-diarios')
export class IngresosDiariosController {
  constructor(private readonly ingresosDiariosService: IngresosDiariosService) {}

  @Post()
  create(@Body() createIngresosDiarioDto: CreateIngresosDiarioDto) {
    return this.ingresosDiariosService.create(createIngresosDiarioDto);
  }

  @Get()
  findAll() {
    return this.ingresosDiariosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ingresosDiariosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIngresosDiarioDto: UpdateIngresosDiarioDto) {
    return this.ingresosDiariosService.update(+id, updateIngresosDiarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ingresosDiariosService.remove(+id);
  }
}
