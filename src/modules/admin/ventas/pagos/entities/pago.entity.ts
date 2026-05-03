import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Venta } from '../../ventas/entities/venta.entity';

@Entity('pagos')
export class Pago {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ventaId: number;                        // 👈 camelCase

  @ManyToOne(() => Venta, (venta) => venta.pagos)
  @JoinColumn({ name: 'venta_id' })       // 👈 BD sigue igual
  venta: Venta;

  @Column()
  metodo: string;                         // efectivo | QR

  @Column('decimal')
  monto: number;

  @CreateDateColumn()                     // 👈 se genera automático
  fecha: Date;
}