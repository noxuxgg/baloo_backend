import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Venta } from './entities/venta.entity';
import { DetalleVenta } from '../detalle-venta/entities/detalle-venta.entity';
import { Pago } from '../pagos/entities/pago.entity';
import { Usuario } from '../../usuarios/entities/usuario.entity';
import { Sucursal } from '../../sucursales/entities/sucursale.entity';
import { Producto } from '../../inventario/productos/entities/producto.entity';
import { Stock } from '../../inventario/stock/entities/stock.entity';
import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';

@Injectable()
export class VentasService {

  constructor(private readonly dataSource: DataSource) {}

  async create(data: CreateVentaDto) {
    const alertas: string[] = [];

    return await this.dataSource.transaction(async (manager) => {

      const usuario = await manager.findOne(Usuario, {
        where: { id: data.usuarioId as any },
      });
      if (!usuario) throw new NotFoundException('El usuario no existe');

      const sucursal = await manager.findOne(Sucursal, {
        where: { id: data.sucursalId },
      });
      if (!sucursal) throw new NotFoundException('La sucursal no existe');

      for (const det of data.detalles) {
        const producto = await manager.findOne(Producto, {
          where: { id: det.productoId },
        });
        if (!producto)
          throw new NotFoundException(`Producto ${det.productoId} no existe`);

        const stock = await manager.findOne(Stock, {
          where: { productoId: det.productoId, sucursalId: data.sucursalId, estado: true },
        });

        if (!stock)
          throw new NotFoundException(
            `"${producto.nombre}" no tiene stock registrado en esta sucursal`
          );

        if (stock.cantidad < det.cantidad)
          throw new BadRequestException(
            `Stock insuficiente para "${producto.nombre}". Disponible: ${stock.cantidad}, Solicitado: ${det.cantidad}`
          );
      }

      const total = data.detalles.reduce(
        (sum, det) => sum + det.cantidad * det.precioUnitario, 0
      );

      const venta = manager.create(Venta, {
        usuarioId: data.usuarioId,
        sucursalId: data.sucursalId,
        total,
        estado: true,
      });
      const ventaGuardada = await manager.save(venta);

      for (const det of data.detalles) {
        await manager.save(manager.create(DetalleVenta, {
          ventaId: ventaGuardada.id,
          productoId: det.productoId,
          cantidad: det.cantidad,
          precioUnitario: det.precioUnitario,
          subtotal: det.cantidad * det.precioUnitario,
        }));

        const stock = await manager.findOne(Stock, {
          where: { productoId: det.productoId, sucursalId: data.sucursalId, estado: true },
        });

        stock!.cantidad -= det.cantidad;
        await manager.save(stock);

        if (stock!.cantidad <= stock!.stockMinimo) {
          const producto = await manager.findOne(Producto, { where: { id: det.productoId } });
          alertas.push(
            `Stock mínimo alcanzado: "${producto!.nombre}" tiene ${stock!.cantidad} unidades (mínimo: ${stock!.stockMinimo})`
          );
        }
      }

      for (const p of data.pagos) {
        await manager.save(manager.create(Pago, {
          ventaId: ventaGuardada.id,
          metodo: p.metodo,
          monto: p.monto,
        }));
      }

      const ventaCompleta = await manager.findOne(Venta, {
        where: { id: ventaGuardada.id },
        relations: ['detalles', 'pagos'],
      });

      return { venta: ventaCompleta, alertas };
    });
  }

  findAll() {
    return this.dataSource.getRepository(Venta).find({
      where: { estado: true },
      relations: ['detalles', 'pagos'],
    });
  }

  findOne(id: number) {
    return this.dataSource.getRepository(Venta).findOne({
      where: { id, estado: true },
      relations: ['detalles', 'pagos'],
    });
  }

  update(id: number, data: UpdateVentaDto) {
    return this.dataSource.getRepository(Venta).update(id, data);
  }

  async remove(id: number) {
    return await this.dataSource.transaction(async (manager) => {

      const venta = await manager.findOne(Venta, {
        where: { id, estado: true },
        relations: ['detalles'],
      });

      if (!venta) throw new NotFoundException(`Venta #${id} no encontrada o ya fue anulada`);

      for (const det of venta.detalles) {
        const stock = await manager.findOne(Stock, {
          where: { productoId: det.productoId, sucursalId: venta.sucursalId, estado: true },
        });

        if (stock) {
          stock.cantidad += det.cantidad; 
          await manager.save(stock);
        }
      }

      await manager.update(Venta, id, { estado: false });

      return { message: `Venta #${id} anulada correctamente` };
    });
  }
}