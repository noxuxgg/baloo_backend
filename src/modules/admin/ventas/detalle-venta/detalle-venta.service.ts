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

  // CREATE
  async create(data: CreateDetalleVentaDto) {

    // Validar venta
    const venta = await this.detalleRepo.manager.findOne(Venta, {
      where: { id: Number(data.ventaId) }      // 👈 camelCase
    });

    if (!venta) {
      throw new NotFoundException('La venta no existe');
    }

    // Validar producto
    const producto = await this.detalleRepo.manager.findOne(Producto, {
      where: { id: data.productoId },    // 👈 camelCase
    });

    if (!producto) {
      throw new NotFoundException('El producto no existe');
    }

    const detalle = this.detalleRepo.create({
      venta,
      producto,
      cantidad: data.cantidad,
      precioUnitario: data.precioUnitario,                    // 👈 camelCase
      subtotal: data.cantidad * data.precioUnitario,          // 👈 camelCase
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

  // UPDATE
  update(id: number, data: UpdateDetalleVentaDto) {
    return this.detalleRepo.update(id, data);
  }

  // DELETE
  remove(id: number) {
    return this.detalleRepo.delete(id);
  }
}