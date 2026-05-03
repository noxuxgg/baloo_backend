import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Venta } from '../../ventas/entities/venta.entity';
import { Producto } from '../../../inventario/productos/entities/producto.entity';

@Entity('detalle_venta')
export class DetalleVenta {

  @PrimaryGeneratedColumn()
  id: number;

  // claves directas (IMPORTANTE)
  @Column()
  venta_id: number;

  @Column()
  producto_id: number;

  // relación con venta
  @ManyToOne(() => Venta, (venta) => venta.detalles)
  @JoinColumn({ name: 'venta_id' })
  venta: Venta;

  // relación con producto
  @ManyToOne(() => Producto, (producto) => producto.detalles)
  @JoinColumn({ name: 'producto_id' })
  producto: Producto;

  @Column()
  cantidad: number;

  @Column('decimal')
  precio_unitario: number;

  @Column('decimal')
  subtotal: number;
}