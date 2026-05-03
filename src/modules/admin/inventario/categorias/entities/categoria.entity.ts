import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Producto } from '../../productos/entities/producto.entity';

@Entity('categorias')
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ nullable: true })
  descripcion: string;

  @OneToMany(() => Producto, (producto) => producto.categoria, { eager: true })
  productos: Producto[];

  @Column({ default: true }) // <--- Agrégala aquí
  estado: boolean;
}