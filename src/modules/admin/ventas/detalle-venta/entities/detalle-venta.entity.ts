import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Venta } from '../../ventas/entities/venta.entity';
import { Producto } from '../../../inventario/productos/entities/producto.entity';

@Entity('detalle_venta')
export class DetalleVenta {

  @PrimaryGeneratedColumn()
  id: number;

  
  // detalle-venta.entity.ts
  @Column()
  ventaId: number;          // 👈 camelCase

  @Column()
  productoId: number;       // 👈 camelCase

  @Column()
  cantidad: number;

  @Column('decimal')
  precioUnitario: number;   // 👈 camelCase

  @Column('decimal')
  subtotal: number;

  @ManyToOne(() => Venta, (venta) => venta.detalles)
  @JoinColumn({ name: 'venta_id' })  // 👈 nombre en BD sigue igual
  venta: Venta;

  @ManyToOne(() => Producto, (producto) => producto.detalles)
  @JoinColumn({ name: 'producto_id' })
  producto: Producto;
  
}