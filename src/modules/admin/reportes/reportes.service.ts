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
    const reporte = await this.reporteRepository.findOneBy({id: id});
    if(!reporte){
      throw new NotFoundException(`El reporte con el ID ${id} NO fue encontrado`);
    }
    return reporte;
  }

  update(id: number, updateReporteDto: UpdateReporteDto) {
    const reporte = this.findOne(id);
    return `This action updates a #${id} reporte`;
  }

  remove(id: number) {
    return `This action removes a #${id} reporte`;
  }
}
