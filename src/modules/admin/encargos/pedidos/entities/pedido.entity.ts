import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DetalleTorta } from "../../detalle-torta/entities/detalle-torta.entity";
import { Cliente } from "../../clientes/entities/cliente.entity";
import { PagosPedido } from "../../pagos-pedido/entities/pagos-pedido.entity";
import { Usuario } from "../../../usuarios/entities/usuario.entity";
import { Sucursal } from "../../../sucursales/entities/sucursale.entity";
@Entity('pedidos')
export class Pedido {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fecha_pedido: Date;

    @Column()
    fecha_entrega: Date;

    @Column()
    hora_entrega: Date;

    @Column()
    cantidad_personas: number;

    @Column()
    estado: string;

    @Column()
    lugar_entrega: string;

    @Column()
    total: number;

    @Column()
    adelanto: number;

    @Column()
    saldo: number;

    @Column()
    observaciones: string;

    @OneToMany(() => DetalleTorta, (detalle_torta) => detalle_torta.pedido)
    detalle_torta: DetalleTorta[]

    @ManyToOne(() => Cliente, (cliente) => cliente.pedidos)
    cliente: Cliente

    @OneToMany(() => PagosPedido, (pagos_pedido) => pagos_pedido.pedido)
    pagos_pedido: PagosPedido[]

    @ManyToOne(() => Usuario, (usuario) => usuario.pedidos)
    usuario: Usuario

    @ManyToOne(() => Sucursal, (sucursal) => sucursal.pedidos)
    sucursal: Sucursal
    
}
