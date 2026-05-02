import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Venta } from '../../ventas/entities/venta.entity';


@Entity('pagos')
export class Pago {

  @PrimaryGeneratedColumn()
  id: number;

  // Relación con venta
  @ManyToOne(() => Venta, (venta) => venta.pagos)
  @JoinColumn({ name: 'venta_id' })
  venta: Venta;

  @Column()
  metodo: string; // efectivo, QR

  @Column('decimal')
  monto: number;

  @Column({ type: 'timestamp' })
  fecha: Date;
}