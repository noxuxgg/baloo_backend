import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "../../roles/entities/role.entity";
import { Reporte } from "../../reportes/entities/reporte.entity";
import { IngresosDiario } from "../../../operacion/ingresos-diarios/entities/ingresos-diario.entity";
import { Gasto } from "../../../operacion/gastos/entities/gasto.entity";
import { Pedido } from "../../encargos/pedidos/entities/pedido.entity";
import { Exclude } from "class-transformer";


@Entity('usuarios')
export class Usuario {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({unique: true})
    nombreUsuario: string;

    @Exclude({ toPlainOnly: true })
    @Column()
    contrasenia: string;

    @Column({default: true})
    estado: boolean;

    @Exclude({ toPlainOnly: true })
    @ManyToMany(() => Role,{eager: false})
    @JoinTable({
        name: 'usuarioRol',
        joinColumn: {name: 'usuarioId'},
        inverseJoinColumn: {name: 'rolId'}
    })
    roles: Role[];

    
    @Exclude({ toPlainOnly: true })
    @OneToMany(() => Reporte, (reporte) => reporte.usuario, {eager: false})
    reporte: Reporte[];

    @Exclude({ toPlainOnly: true })
    @OneToMany(() => IngresosDiario, (ingreso) => ingreso.usuario, {eager: false})
    ingresos: IngresosDiario[];

    @Exclude({ toPlainOnly: true })
    @OneToMany(() => Gasto, (gasto) => gasto.usuario, {eager: false})
    gastos: Gasto[];

    @Exclude({ toPlainOnly: true })
    @OneToMany(() => Pedido, (pedido) => pedido.usuario, {eager: false})
    pedidos: Pedido[];
}
