import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DetalleVenta } from './entities/detalle-venta.entity';

@Injectable()
export class DetalleVentaService {
  constructor(
    @InjectRepository(DetalleVenta)
    private detalleRepo: Repository<DetalleVenta>,
  ) {}

  create(data: any) {
    const detalle = this.detalleRepo.create(data);
    return this.detalleRepo.save(detalle);
  }

  findAll() {
    return this.detalleRepo.find({
      relations: ['venta', 'producto'],
    });
  }

  findOne(id: number) {
    return this.detalleRepo.findOne({
      where: { id },
      relations: ['venta', 'producto'],
    });
  }

  update(id: number, data: any) {
    return this.detalleRepo.update(id, data);
  }

  remove(id: number) {
    return this.detalleRepo.delete(id);
  }
}