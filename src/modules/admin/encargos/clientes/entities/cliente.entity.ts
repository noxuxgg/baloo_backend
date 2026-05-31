import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Pedido } from "../../pedidos/entities/pedido.entity";
@Entity('clientes')
export class Cliente {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({default: 0})
    carnet: number;
    @Column({nullable: true})
    complemento: string;
    @Column()
    nombre: string;
    @Column()
    apellido: string;
    @Column()
    telefono: string;
    @Column()
    estado: boolean;
    @OneToMany(() => Pedido, (pedido) => pedido.cliente)
    pedidos: Pedido[];
}
