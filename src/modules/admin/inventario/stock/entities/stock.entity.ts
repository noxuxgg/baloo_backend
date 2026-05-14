import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Producto } from '../../productos/entities/producto.entity';
import { Sucursal } from '../../../sucursales/entities/sucursale.entity';

@Entity('stock')
export class Stock {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cantidad: number;

  @Column()
  stockMinimo: number;

  @Column()
  productoId: number; 

  @Column({ default: true })
  estado: boolean;

  @ManyToOne(() => Producto, (producto) => producto.stocks, { eager: true })
  @JoinColumn({ name: 'productoId' })
  producto: Producto;

  @Column()
  sucursalId: number; 

  @ManyToOne(() => Sucursal, (sucursal) => sucursal.stocks, { eager: true })
  @JoinColumn({ name: 'sucursalId' }) 
  sucursal: Sucursal; 

  
}