import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { IngresosDiario } from "../../../operacion/ingresos-diarios/entities/ingresos-diario.entity";
import { Gasto } from "../../../operacion/gastos/entities/gasto.entity";

@Entity('sucursales')
export class Sucursal {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    nombre: string;

    @Column()
    direccion: string;

    @Column({nullable: true})
    telefono: string;

    @Column({ default: true })
    estado: boolean;

    @OneToMany(() => IngresosDiario, (ingresos) => ingresos.sucursal)
    ingresos: IngresosDiario[]
    
    @OneToMany(() => Gasto, (gasto) => gasto.sucursal)
    gastos: Gasto[]
}
