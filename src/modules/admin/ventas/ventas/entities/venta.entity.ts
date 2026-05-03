import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';

import { DetalleVenta } from '../../detalle-venta/entities/detalle-venta.entity';
import { Pago } from '../../pagos/entities/pago.entity';
import { Sucursal } from '../../../sucursales/entities/sucursale.entity';

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

  // 🔗 relación con detalle_venta
  @OneToMany(() => DetalleVenta, (detalle) => detalle.venta)
  detalles: DetalleVenta[];

  // 🔗 relación con pagos
  @OneToMany(() => Pago, (pago) => pago.venta)
  pagos: Pago[];

  // 🔥 relación con sucursal (IMPORTANTE)
  @ManyToOne(() => Sucursal, (sucursal) => sucursal.ventas)
  @JoinColumn({ name: 'sucursal_id' })
  sucursal: Sucursal;
}