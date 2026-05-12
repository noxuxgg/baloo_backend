import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { DetalleVenta } from '../../detalle-venta/entities/detalle-venta.entity';
import { Pago } from '../../pagos/entities/pago.entity';
import { Sucursal } from '../../../sucursales/entities/sucursale.entity';
import { Usuario } from '../../../usuarios/entities/usuario.entity';

@Entity('ventas')
export class Venta {

  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  fecha: Date;

  @Column('decimal', { precision: 10, scale: 2 })
  total: number;

  @Column({ nullable: true })
  usuarioId: string;

  @Column({ nullable: true })
  sucursalId: number;

  @Column({ default: true }) // 👈 agregado
  estado: boolean;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'usuarioId' })
  usuario: Usuario;

  @ManyToOne(() => Sucursal, (sucursal) => sucursal.ventas)
  @JoinColumn({ name: 'sucursalId' })
  sucursal: Sucursal;

  @OneToMany(() => DetalleVenta, (detalle) => detalle.venta)
  detalles: DetalleVenta[];

  @OneToMany(() => Pago, (pago) => pago.venta)
  pagos: Pago[];
}