import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "../../usuarios/entities/usuario.entity";

@Entity('reportes')
export class Reporte {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    tipo: string;
    
    @Column({ type: 'timestamp' })
    fechaInicio: Date;
    
    @Column({ type: 'timestamp' })
    fechaFin: Date;

    @ManyToOne(() => Usuario, (usuario) => usuario.reporte, { 
        onDelete: 'SET NULL',
        nullable: true 
    })
    usuario: Usuario
}
