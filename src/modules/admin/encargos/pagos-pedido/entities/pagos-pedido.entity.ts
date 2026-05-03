import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Pedido } from "../../pedidos/entities/pedido.entity";


@Entity('pagos_pedido')
export class PagosPedido {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    metodo: string;
    @Column()
    monto: number;
    @Column()
    fecha: Date;
    @ManyToOne(() => Pedido, (pedido) => pedido.pagos_pedido)
    pedido: Pedido
}
