import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { Venta } from './entities/venta.entity';
import { DetalleVenta } from '../detalle-venta/entities/detalle-venta.entity';
import { Pago } from '../pagos/entities/pago.entity';

import { Usuario } from '../../usuarios/entities/usuario.entity';
import { Sucursal } from '../../sucursales/entities/sucursale.entity';
import { Producto } from '../../inventario/productos/entities/producto.entity';

@Injectable()
export class VentasService {

  constructor(
    private readonly dataSource: DataSource
  ) {}

  // CREAR VENTA COMPLETA
  async create(data: any) {
    return await this.dataSource.transaction(async (manager) => {

      // validar usuario
      const usuario = await manager.findOne(Usuario, {
        where: { id: data.usuario_id }
      });

      if (!usuario) {
        throw new NotFoundException('El usuario no existe');
      }

      //  validar sucursal
      const sucursal = await manager.findOne(Sucursal, {
        where: { id: data.sucursal_id }
      });

      if (!sucursal) {
        throw new NotFoundException('La sucursal no existe');
      }

      let total = 0;

      // validar productos + calcular total
      for (const det of data.detalles) {

        const producto = await manager.findOne(Producto, {
          where: { id: det.producto_id }
        });

        if (!producto) {
          throw new NotFoundException(`Producto ${det.producto_id} no existe`);
        }

        det.subtotal = det.cantidad * det.precio_unitario;
        total += det.subtotal;
      }

      // guardar venta
      const venta = manager.create(Venta, {
        fecha: data.fecha,
        usuario_id: data.usuario_id,
        sucursal_id: data.sucursal_id,
        total: total
      });

      const ventaGuardada = await manager.save(venta);

      // guardar detalles
      for (const det of data.detalles) {
        const detalle = manager.create(DetalleVenta, {
          venta: ventaGuardada,
          producto: { id: det.producto_id },
          cantidad: det.cantidad,
          precio_unitario: det.precio_unitario,
          subtotal: det.subtotal
        });

        await manager.save(detalle);
      }

      // guardar pagos
      for (const p of data.pagos) {
        const pago = manager.create(Pago, {
          venta: ventaGuardada,
          metodo: p.metodo,
          monto: p.monto,
          fecha: new Date()
        });

        await manager.save(pago);
      }

      //  devolver completo
      return await manager.findOne(Venta, {
        where: { id: ventaGuardada.id },
        relations: ['detalles', 'pagos']
      });
    });
  }

  //  LISTAR
  findAll() {
    return this.dataSource.getRepository(Venta).find({
      relations: ['detalles', 'pagos']
    });
  }

  //  UNO
  findOne(id: number) {
    return this.dataSource.getRepository(Venta).findOne({
      where: { id },
      relations: ['detalles', 'pagos']
    });
  }

  //  (opcional)
  update(id: number, data: any) {
    return {};
  }

  // 🗑 (opcional)
  remove(id: number) {
    return {};
  }
}