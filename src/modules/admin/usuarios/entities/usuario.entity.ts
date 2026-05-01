import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "../../roles/entities/role.entity";
import { Reporte } from "../../reportes/entities/reporte.entity";
import { IngresosDiario } from "../../../operacion/ingresos-diarios/entities/ingresos-diario.entity";
import { Gasto } from "../../../operacion/gastos/entities/gasto.entity";

@Entity('usuarios')
export class Usuario {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    nombreUsuario: string;

    @Column()
    contrasenia: string;

    @Column({default: true})
    estado: boolean;

    @ManyToMany(() => Role,{eager: true})
    @JoinTable({
        name: 'usuario_rol',
        joinColumn: {name: 'usuario_id'},
        inverseJoinColumn: {name: 'rol_id'}
    })
    roles: Role[];

    @OneToMany(() => Reporte, (reporte) => reporte.usuario)
    reporte: Reporte[]

    @OneToMany(() => IngresosDiario, (ingreso) => ingreso.usuario)
    ingresos: IngresosDiario[]

    @OneToMany(() => Gasto, (gasto) => gasto.usuario)
    gastos: Gasto[]
}
