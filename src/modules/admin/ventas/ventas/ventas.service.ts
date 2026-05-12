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

      // 1. Validar usuario
      const usuario = await manager.findOne(Usuario, {
        where: { id: data.usuarioId as any },
      });
      if (!usuario) throw new NotFoundException('El usuario no existe');

      // 2. Validar sucursal
      const sucursal = await manager.findOne(Sucursal, {
        where: { id: data.sucursalId },
      });
      if (!sucursal) throw new NotFoundException('La sucursal no existe');

      // 3. Validar stock de todos los productos ANTES de guardar nada
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

      // 4. Guardar la venta
      let total = data.detalles.reduce(
        (sum, det) => sum + det.cantidad * det.precioUnitario, 0
      );

      const venta = manager.create(Venta, {
        usuarioId: data.usuarioId,
        sucursalId: data.sucursalId,
        total,
      });
      const ventaGuardada = await manager.save(venta);

      // 5. Guardar detalles y descontar stock
      for (const det of data.detalles) {
        // Guardar detalle
        await manager.save(manager.create(DetalleVenta, {
          ventaId: ventaGuardada.id,
          productoId: det.productoId,
          cantidad: det.cantidad,
          precioUnitario: det.precioUnitario,
          subtotal: det.cantidad * det.precioUnitario,
        }));

        // Descontar stock
        const stock = await manager.findOne(Stock, {
          where: { productoId: det.productoId, sucursalId: data.sucursalId, estado: true },
        });

        stock!.cantidad -= det.cantidad;
        await manager.save(stock);

        // Alerta si baja del mínimo
        if (stock!.cantidad <= stock!.stockMinimo) {
          const producto = await manager.findOne(Producto, { where: { id: det.productoId } });
          alertas.push(
            `Stock mínimo alcanzado: "${producto!.nombre}" tiene ${stock!.cantidad} unidades (mínimo: ${stock!.stockMinimo})`
          );
        }
      }

      // 6. Guardar pagos
      for (const p of data.pagos) {
        await manager.save(manager.create(Pago, {
          ventaId: ventaGuardada.id,
          metodo: p.metodo,
          monto: p.monto,
        }));
      }

      // 7. Retornar venta + alertas
      const ventaCompleta = await manager.findOne(Venta, {
        where: { id: ventaGuardada.id },
        relations: ['detalles', 'pagos'],
      });

      return { venta: ventaCompleta, alertas };
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