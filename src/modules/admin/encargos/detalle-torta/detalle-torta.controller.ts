import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DetalleTortaService } from './detalle-torta.service';
import { CreateDetalleTortaDto } from './dto/create-detalle-torta.dto';
import { UpdateDetalleTortaDto } from './dto/update-detalle-torta.dto';

@Controller('detalle-torta')
export class DetalleTortaController {
  constructor(private readonly detalleTortaService: DetalleTortaService) {}

  @Post()
  create(@Body() createDetalleTortaDto: CreateDetalleTortaDto) {
    return this.detalleTortaService.create(createDetalleTortaDto);
  }

  @Get()
  findAll() {
    return this.detalleTortaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.detalleTortaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDetalleTortaDto: UpdateDetalleTortaDto) {
    return this.detalleTortaService.update(+id, updateDetalleTortaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.detalleTortaService.remove(+id);
  }
}
