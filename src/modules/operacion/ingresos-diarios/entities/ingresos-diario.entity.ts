import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "../../../admin/usuarios/entities/usuario.entity";
import { Sucursal } from "../../../admin/sucursales/entities/sucursale.entity";
import { Exclude } from "class-transformer";

@Entity('ingresos_diarios')
export class IngresosDiario {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    fecha: Date;

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    total: number;

    @Column({ type: 'text', nullable: true })
    observaciones: string;

    @ManyToOne(() => Usuario, (usuario) => usuario.ingresos, { eager: true})
    usuario: Usuario

    @ManyToOne(() => Sucursal, (sucursal) => sucursal.ingresos, { eager: true})
    sucursal: Sucursal
}
