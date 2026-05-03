import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Pedido } from "../../pedidos/entities/pedido.entity"

@Entity('detalle_torta')
export class DetalleTorta {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    sabor: string;
    @Column()
    color: string;
    @Column()
    texto_torta: string;
    @Column()
    decoracion: string;
    @Column()
    forma: string;
    @ManyToOne(() => Pedido, (pedido) => pedido.detalle_torta)
    pedido: Pedido
}
