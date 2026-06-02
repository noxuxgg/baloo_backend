import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Venta } from '../../ventas/entities/venta.entity';

@Entity('pagos')
export class Pago {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  ventaId: number;

  @Column()
  metodo: string;

  @Column('decimal', { precision: 10, scale: 2 })
  monto: number;

  @CreateDateColumn()
  fecha: Date;

  @ManyToOne(() => Venta, (venta) => venta.pagos)
  @JoinColumn({ name: 'ventaId' })            
  venta: Venta;
}