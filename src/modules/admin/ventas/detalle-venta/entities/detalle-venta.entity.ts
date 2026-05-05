import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Venta } from '../../ventas/entities/venta.entity';
import { Producto } from '../../../inventario/productos/entities/producto.entity';

@Entity('detalleVenta')                       // 👈 camelCase en BD
export class DetalleVenta {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  ventaId: number;

  @Column({ nullable: true })
  productoId: number;

  @Column()
  cantidad: number;

  @Column('decimal', { precision: 10, scale: 2 })
  precioUnitario: number;

  @Column('decimal', { precision: 10, scale: 2 })
  subtotal: number;

  @ManyToOne(() => Venta, (venta) => venta.detalles)
  @JoinColumn({ name: 'ventaId' })            // 👈 camelCase en BD
  venta: Venta;

  @ManyToOne(() => Producto, (producto) => producto.detalles)
  @JoinColumn({ name: 'productoId' })         // 👈 camelCase en BD
  producto: Producto;
}