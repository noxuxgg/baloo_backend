import { Injectable } from '@nestjs/common';
import { CreateIngresosDiarioDto } from './dto/create-ingresos-diario.dto';
import { UpdateIngresosDiarioDto } from './dto/update-ingresos-diario.dto';

@Injectable()
export class IngresosDiariosService {
  create(createIngresosDiarioDto: CreateIngresosDiarioDto) {
    return 'This action adds a new ingresosDiario';
  }

  findAll() {
    return `This action returns all ingresosDiarios`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ingresosDiario`;
  }

  update(id: number, updateIngresosDiarioDto: UpdateIngresosDiarioDto) {
    return `This action updates a #${id} ingresosDiario`;
  }

  remove(id: number) {
    return `This action removes a #${id} ingresosDiario`;
  }
}
