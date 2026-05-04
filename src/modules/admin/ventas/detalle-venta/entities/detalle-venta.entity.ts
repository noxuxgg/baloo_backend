import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Venta } from '../../ventas/entities/venta.entity';
import { Producto } from '../../../inventario/productos/entities/producto.entity';

@Entity('detalle_venta')
export class DetalleVenta {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Venta, (venta) => venta.detalles)
  @JoinColumn({ name: 'ventaId' })          // camelCase en BD
  venta: Venta;

  @ManyToOne(() => Producto, (producto) => producto.detalles)
  @JoinColumn({ name: 'productoId' })       //  camelCase en BD
  producto: Producto;

  @Column()
  cantidad: number;

  @Column({ name: 'precioUnitario' })       //  camelCase en BD
  precioUnitario: number;

  @Column()
  subtotal: number;
}