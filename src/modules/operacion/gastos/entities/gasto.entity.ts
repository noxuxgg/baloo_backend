import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "../../../admin/usuarios/entities/usuario.entity";
import { Sucursal } from "../../../admin/sucursales/entities/sucursale.entity";

@Entity('gastos')
export class Gasto {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })    
    fecha: Date;

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    monto: number;

    @Column({ type: 'text', nullable: false})
    motivo: string;

    @Column({ type: 'text', nullable: false})
    personaRecibe: string;

    @ManyToOne(() => Usuario, (usuario) => usuario.gastos)
    usuario: Usuario
    
    @ManyToOne(() => Sucursal, (sucursal) => sucursal.gastos)
    sucursal: Sucursal
}
