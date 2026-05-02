import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Producto } from '../../productos/entities/producto.entity';

@Entity('stock')
export class Stock {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cantidad: number;

  @Column()
  stock_minimo: number;

   @ManyToOne(() => Producto, (producto) => producto.stocks)
  producto: Producto;

  @Column()
  sucursal_id: number; 
}