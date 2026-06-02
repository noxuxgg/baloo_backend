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
    fechaPedido: Date;

    @Column()
    fechaEntrega: Date;

    @Column()
    horaEntrega: string;

    @Column()
    cantidadPersonas: number;

    @Column()
    estado: boolean;

    @Column({ type: 'int', default: 1,nullable: true })
    estadoEntrega: number;

    @Column({ type: 'int', default: 1,nullable: true })
    estadoPago: number;

    @Column()
    lugarEntrega: string;

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
