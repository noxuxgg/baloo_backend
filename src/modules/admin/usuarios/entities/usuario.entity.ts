import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "../../roles/entities/role.entity";
import { Reporte } from "../../reportes/entities/reporte.entity";
import { IngresosDiario } from "../../../operacion/ingresos-diarios/entities/ingresos-diario.entity";
import { Gasto } from "../../../operacion/gastos/entities/gasto.entity";
import { Pedido } from "../../encargos/pedidos/entities/pedido.entity";


@Entity('usuarios')
export class Usuario {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({unique: true})
    nombreUsuario: string;

    @Column()
    contrasenia: string;

    @Column({default: true})
    estado: boolean;

    @ManyToMany(() => Role,{eager: true})
    @JoinTable({
        name: 'usuarioRol',
        joinColumn: {name: 'usuarioId'},
        inverseJoinColumn: {name: 'rolId'}
    })
    roles: Role[];

    @OneToMany(() => Reporte, (reporte) => reporte.usuario, {eager: true})
    reporte: Reporte[]

    @OneToMany(() => IngresosDiario, (ingreso) => ingreso.usuario, {eager: true})
    ingresos: IngresosDiario[]

    @OneToMany(() => Gasto, (gasto) => gasto.usuario, {eager: true})
    gastos: Gasto[]

    @OneToMany(() => Pedido, (pedido) => pedido.usuario, {eager: true})
    pedidos: Pedido[]


}
