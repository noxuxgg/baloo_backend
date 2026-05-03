import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { Venta } from './entities/venta.entity';
import { DetalleVenta } from '../detalle-venta/entities/detalle-venta.entity';
import { Pago } from '../pagos/entities/pago.entity';
import { Usuario } from '../../usuarios/entities/usuario.entity';
import { Sucursal } from '../../sucursales/entities/sucursale.entity';
import { Producto } from '../../inventario/productos/entities/producto.entity';
import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';

@Injectable()
export class VentasService {

  constructor(private readonly dataSource: DataSource) {}

  // CREATE
  async create(data: CreateVentaDto) {
    return await this.dataSource.transaction(async (manager) => {

      // Validar usuario
// Validar usuario — cast a any para evitar el error de tipos
      const usuario = await manager.findOne(Usuario, {
        where: { id: data.usuarioId as any },    //esto soluciona el error de TS
      });

if (!usuario) throw new NotFoundException('El usuario no existe');

      // Validar sucursal
      const sucursal = await manager.findOne(Sucursal, {
        where: { id: data.sucursalId },         // camelCase
      });
      if (!sucursal) throw new NotFoundException('La sucursal no existe');

      let total = 0;

      // Validar productos y calcular total
      for (const det of data.detalles) {
        const producto = await manager.findOne(Producto, {
          where: { id: det.productoId },        // camelCase
        });
        if (!producto) {
          throw new NotFoundException(`Producto ${det.productoId} no existe`);
        }
        total += det.cantidad * det.precioUnitario; // camelCase
      }

      // Guardar venta
      const venta = manager.create(Venta, {
        usuarioId: data.usuarioId,              //  camelCase
        sucursalId: data.sucursalId,            // camelCase
        total,
      });
      const ventaGuardada = await manager.save(venta);

      // Guardar detalles
      for (const det of data.detalles) {
        const detalle = manager.create(DetalleVenta, {
          venta: ventaGuardada,
          producto: { id: det.productoId },     //camelCase
          cantidad: det.cantidad,
          precioUnitario: det.precioUnitario,   //camelCase
          subtotal: det.cantidad * det.precioUnitario,
        });
        await manager.save(detalle);
      }

      // Guardar pagos
      for (const p of data.pagos) {
        const pago = manager.create(Pago, {
          venta: ventaGuardada,
          metodo: p.metodo,
          monto: p.monto,
        });
        await manager.save(pago);
      }

      // Devolver venta completa
      return await manager.findOne(Venta, {
        where: { id: ventaGuardada.id },
        relations: ['detalles', 'pagos'],
      });
    });
  }

  // GET ALL
  findAll() {
    return this.dataSource.getRepository(Venta).find({
      relations: ['detalles', 'pagos'],
    });
  }

  // GET ONE
  findOne(id: number) {
    return this.dataSource.getRepository(Venta).findOne({
      where: { id },
      relations: ['detalles', 'pagos'],
    });
  }

  // UPDATE
  update(id: number, data: UpdateVentaDto) {
    return this.dataSource.getRepository(Venta).update(id, data);
  }

  // DELETE
  remove(id: number) {
    return this.dataSource.getRepository(Venta).delete(id);
  }
}