import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Pago } from './entities/pago.entity';
import { CreatePagoDto } from './dto/create-pago.dto';
import { UpdatePagoDto } from './dto/update-pago.dto';
import { Venta } from '../ventas/entities/venta.entity';

@Injectable()
export class PagosService {

  constructor(
    @InjectRepository(Pago)
    private pagoRepo: Repository<Pago>,
  ) {}

  async create(data: CreatePagoDto) {

    const venta = await this.pagoRepo.manager.findOne(Venta, {
      where: { id: data.ventaId },        
    });

    if (!venta) {
      throw new NotFoundException('La venta no existe');
    }

    const pago = this.pagoRepo.create({
      venta,                              
      metodo: data.metodo,
      monto: data.monto,
    });

    return this.pagoRepo.save(pago);
  }

  findAll() {
    return this.pagoRepo.find({
      relations: ['venta'],
    });
  }

  findOne(id: number) {
    return this.pagoRepo.findOne({
      where: { id },
      relations: ['venta'],
    });
  }

  update(id: number, data: UpdatePagoDto) {
    return this.pagoRepo.update(id, data);
  }

  remove(id: number) {
    return this.pagoRepo.delete(id);
  }
}