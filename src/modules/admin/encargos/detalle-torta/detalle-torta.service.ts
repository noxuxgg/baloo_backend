import { Injectable } from '@nestjs/common';
import { CreateDetalleTortaDto } from './dto/create-detalle-torta.dto';
import { UpdateDetalleTortaDto } from './dto/update-detalle-torta.dto';

@Injectable()
export class DetalleTortaService {
  create(createDetalleTortaDto: CreateDetalleTortaDto) {
    return 'This action adds a new detalleTorta';
  }

  findAll() {
    return `This action returns all detalleTorta`;
  }

  findOne(id: number) {
    return `This action returns a #${id} detalleTorta`;
  }

  update(id: number, updateDetalleTortaDto: UpdateDetalleTortaDto) {
    return `This action updates a #${id} detalleTorta`;
  }

  remove(id: number) {
    return `This action removes a #${id} detalleTorta`;
  }
}
