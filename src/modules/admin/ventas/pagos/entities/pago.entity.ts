import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Venta } from '../../ventas/entities/venta.entity';

@Entity('pagos')
export class Pago {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Venta, (venta) => venta.pagos)
  @JoinColumn({ name: 'ventaId' })          // 👈 camelCase en BD
  venta: Venta;

  @Column()
  metodo: string;

  @Column('decimal')
  monto: number;

  @CreateDateColumn()
  fecha: Date;
}