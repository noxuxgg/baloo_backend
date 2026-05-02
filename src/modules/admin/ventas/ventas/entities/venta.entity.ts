import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { DetalleVenta } from '../../detalle-venta/entities/detalle-venta.entity';
import { Pago } from '../../pagos/entities/pago.entity';

@Entity('ventas')
export class Venta {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp' })
  fecha: Date;

  @Column('decimal')
  total: number;

  @Column()
  usuario_id: number;

  @Column()
  sucursal_id: number;

  // Relación con detalle_venta
  @OneToMany(() => DetalleVenta, (detalle) => detalle.venta)
  detalles: DetalleVenta[];

  // Relación con pagos
  @OneToMany(() => Pago, (pago) => pago.venta)
  pagos: Pago[];
}