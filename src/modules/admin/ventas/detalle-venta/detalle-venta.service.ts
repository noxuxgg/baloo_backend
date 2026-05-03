import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DetalleVenta } from './entities/detalle-venta.entity';
import { CreateDetalleVentaDto } from './dto/create-detalle-venta.dto';
import { UpdateDetalleVentaDto } from './dto/update-detalle-venta.dto';

import { Venta } from '../ventas/entities/venta.entity';
import { Producto } from '../../inventario/productos/entities/producto.entity';

@Injectable()
export class DetalleVentaService {
  constructor(
    @InjectRepository(DetalleVenta)
    private detalleRepo: Repository<DetalleVenta>,
  ) {}

  // CREATE REAL
  async create(data: CreateDetalleVentaDto) {

    // validar venta
    const venta = await this.detalleRepo.manager.findOne(Venta, {
      where: { id: data.venta_id }
    });

    if (!venta) {
      throw new NotFoundException('La venta no existe');
    }

    // validar producto
    const producto = await this.detalleRepo.manager.findOne(Producto, {
      where: { id: data.producto_id }
    });

    if (!producto) {
      throw new NotFoundException('El producto no existe');
    }

    const detalle = this.detalleRepo.create({
      venta: venta,
      producto: producto,
      cantidad: data.cantidad,
      precio_unitario: data.precio_unitario,
      subtotal: data.subtotal
    });

    return this.detalleRepo.save(detalle);
  }

  // GET ALL
  findAll() {
    return this.detalleRepo.find({
      relations: ['venta', 'producto'],
    });
  }

  // GET ONE
  findOne(id: number) {
    return this.detalleRepo.findOne({
      where: { id },
      relations: ['venta', 'producto'],
    });
  }

  // ✏️ UPDATE
  update(id: number, data: UpdateDetalleVentaDto) {
    return this.detalleRepo.update(id, data);
  }

  // 🗑 DELETE
  remove(id: number) {
    return this.detalleRepo.delete(id);
  }
}