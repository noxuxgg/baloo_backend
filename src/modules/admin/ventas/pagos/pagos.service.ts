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

  // 🔥 CREAR PAGO
  async create(data: CreatePagoDto) {

    const venta = await this.pagoRepo.manager.findOne(Venta, {
      where: { id: data.venta_id }
    });

    if (!venta) {
      throw new NotFoundException('La venta no existe');
    }

    const pago = this.pagoRepo.create({
      venta: venta,
      metodo: data.metodo,
      monto: data.monto,
      fecha: new Date()
    });

    return this.pagoRepo.save(pago);
  }

  // 🔍 LISTAR
  findAll() {
    return this.pagoRepo.find({
      relations: ['venta'],
    });
  }

  // 🔍 UNO
  findOne(id: number) {
    return this.pagoRepo.findOne({
      where: { id },
      relations: ['venta'],
    });
  }

  // ✏️ ACTUALIZAR
  update(id: number, data: UpdatePagoDto) {
    return this.pagoRepo.update(id, data);
  }

  // 🗑 ELIMINAR
  remove(id: number) {
    return this.pagoRepo.delete(id);
  }
}