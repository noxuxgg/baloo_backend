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

  async create(data: CreateVentaDto) {
    return await this.dataSource.transaction(async (manager) => {

      const usuario = await manager.findOne(Usuario, {
        where: { id: data.usuarioId as any },
      });
      if (!usuario) throw new NotFoundException('El usuario no existe');

      const sucursal = await manager.findOne(Sucursal, {
        where: { id: data.sucursalId },
      });
      if (!sucursal) throw new NotFoundException('La sucursal no existe');

      let total = 0;
      for (const det of data.detalles) {
        const producto = await manager.findOne(Producto, {
          where: { id: det.productoId },
        });
        if (!producto) throw new NotFoundException(`Producto ${det.productoId} no existe`);
        total += det.cantidad * det.precioUnitario;
      }

      const venta = manager.create(Venta, {
        usuarioId: data.usuarioId,
        sucursalId: data.sucursalId,
        total,
      });
      const ventaGuardada = await manager.save(venta);

      for (const det of data.detalles) {
        const detalle = manager.create(DetalleVenta, {
          ventaId: ventaGuardada.id,
          productoId: det.productoId,
          cantidad: det.cantidad,
          precioUnitario: det.precioUnitario,
          subtotal: det.cantidad * det.precioUnitario,
        });
        await manager.save(detalle);
      }

      for (const p of data.pagos) {
        const pago = manager.create(Pago, {
          ventaId: ventaGuardada.id,
          metodo: p.metodo,
          monto: p.monto,
        });
        await manager.save(pago);
      }

      return await manager.findOne(Venta, {
        where: { id: ventaGuardada.id },
        relations: ['detalles', 'pagos'],
      });
    });
  }

  findAll() {
    return this.dataSource.getRepository(Venta).find({
      relations: ['detalles', 'pagos'],
    });
  }

  findOne(id: number) {
    return this.dataSource.getRepository(Venta).findOne({
      where: { id },
      relations: ['detalles', 'pagos'],
    });
  }

  update(id: number, data: UpdateVentaDto) {
    return this.dataSource.getRepository(Venta).update(id, data);
  }

  remove(id: number) {
    return this.dataSource.getRepository(Venta).delete(id);
  }
}