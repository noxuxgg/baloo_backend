import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateReporteDto } from './dto/create-reporte.dto';
import { UpdateReporteDto } from './dto/update-reporte.dto';
import { Reporte } from './entities/reporte.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Usuario } from '../usuarios/entities/usuario.entity';

@Injectable()
export class ReportesService {
  constructor(
    @InjectRepository(Reporte)
    private reporteRepository: Repository<Reporte>,
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>
  ) { }

  async create(createReporteDto: CreateReporteDto) {
    const { tipo, fechaInicio, fechaFin, usuarioId } = createReporteDto;
    const usuarioExistente = await this.usuarioRepository.findOneBy({ id: usuarioId });
    if (!usuarioExistente) {
      throw new NotFoundException(`El usuario con ID ${usuarioId} no existe`);
    }
    const nuevoReporte = this.reporteRepository.create({
      tipo,
      fechaInicio,
      fechaFin,
      usuario: usuarioExistente
    });
    const reporte = await this.reporteRepository.save(nuevoReporte);
    return reporte;
  }

  async findAll() {
    const reportes = await this.reporteRepository.find();
    return reportes;
  }

  async findOne(id: number) {
    const reporte = await this.reporteRepository.findOneBy({ id: id });
    if (!reporte) {
      throw new NotFoundException(`El reporte con el ID ${id} NO fue encontrado`);
    }
    return reporte;
  }

  async update(id: number, updateReporteDto: UpdateReporteDto) {
    const reporte = await this.reporteRepository.findOne({
      where: { id },
      relations: ['usuario']
    });

    if (!reporte) {
      throw new NotFoundException(`El reporte con ID ${id} no existe`);
    }
    if (updateReporteDto.usuarioId) {
      const usuarioExistente = await this.usuarioRepository.findOneBy({ id: updateReporteDto.usuarioId });

      if (!usuarioExistente) {
        throw new NotFoundException(`El usuario con ID ${updateReporteDto.usuarioId} no existe`);
      }
      reporte.usuario = usuarioExistente;
    }
    Object.assign(reporte, updateReporteDto);
    return await this.reporteRepository.save(reporte);
  }

  async remove(id: number) {
    const reporte = await this.findOne(id);
    await this.reporteRepository.remove(reporte)
    return {message: `El reporte con identificador ${id} ha sido eliminado`};
  }
}
