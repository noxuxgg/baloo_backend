import { Entity, PrimaryGeneratedColumn, JoinColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Categoria } from '../../categorias/entities/categoria.entity';
import { Stock } from '../../stock/entities/stock.entity';
import { DetalleVenta } from '../../../ventas/detalle-venta/entities/detalle-venta.entity';

@Entity('productos')
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column('decimal', { precision: 10, scale: 2 })
  precio: number;

  @Column({ default: true })
  estado: boolean;

  // producto.entity.ts

  @Column({ nullable: true })
  categoriaId: number; // Esto crea la columna física en la DB

  @ManyToOne(() => Categoria, (categoria) => categoria.productos)
  @JoinColumn({ name: 'categoriaId' }) // Enlaza la relación con la columna de arriba
  categoria: Categoria;

  @OneToMany(() => Stock, (stock) => stock.producto)
  stocks: Stock[];

  @OneToMany(() => DetalleVenta, (detalle) => detalle.producto)
  detalles: DetalleVenta[];
}