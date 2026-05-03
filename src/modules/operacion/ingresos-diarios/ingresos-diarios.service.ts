import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateIngresosDiarioDto } from './dto/create-ingresos-diario.dto';
import { UpdateIngresosDiarioDto } from './dto/update-ingresos-diario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { IngresosDiario } from './entities/ingresos-diario.entity';
import { Repository } from 'typeorm';
import { Usuario } from '../../admin/usuarios/entities/usuario.entity';
import { Sucursal } from '../../admin/sucursales/entities/sucursale.entity';

@Injectable()
export class IngresosDiariosService {

  constructor(
    @InjectRepository(IngresosDiario)
    private ingresoRepository: Repository<IngresosDiario>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(Sucursal)
    private readonly sucursalRepository: Repository<Sucursal>
  ){}

  async create(createIngresosDiarioDto: CreateIngresosDiarioDto) {
    const { usuarioId, sucursalId, ...datosIngreso } = createIngresosDiarioDto;
    const usuario = await this.usuarioRepository.findOneBy({id: usuarioId});
    const sucursal = await this.sucursalRepository.findOneBy({id: sucursalId});
    if (!usuario){
      throw new NotFoundException(`No existe el usuario con ID: ${usuarioId}`);
    }
    if (!sucursal){
      throw new NotFoundException(`No existe la sucursal con ID: ${sucursalId}`);
    }
    const nuevoIngreso = await this.ingresoRepository.create({
      ...datosIngreso,
      usuario,
      sucursal,
    });
    const ingreso = await this.ingresoRepository.save(nuevoIngreso)
    return ingreso;
  }

  async findAll() {
    const ingresos = await this.ingresoRepository.find()
    return ingresos;
  }

  async findOne(id: number) {
    const ingreso = await this.ingresoRepository.findOneBy({id: id});
    if (!ingreso){
      throw new NotFoundException(`No existe el ingreso con ID: ${id}`);
    }
    return ingreso;
  }

  async update(id: number, updateIngresosDiarioDto: UpdateIngresosDiarioDto) {
    const ingreso = await this.ingresoRepository.findOne({
      where: { id },
      relations: ['usuario', 'sucursal']
    });

    if (!ingreso) {
      throw new NotFoundException(`El reporte con ID ${id} no existe`);
    }
    if (updateIngresosDiarioDto.usuarioId) {
      const usuarioExistente = await this.usuarioRepository.findOneBy({ id: updateIngresosDiarioDto.usuarioId });

      if (!usuarioExistente) {
        throw new NotFoundException(`El usuario con ID ${updateIngresosDiarioDto.usuarioId} no existe`);
      }
      ingreso.usuario = usuarioExistente;
    }
    if (updateIngresosDiarioDto.sucursalId) {
      const sucursalExiste = await this.sucursalRepository.findOneBy({ id: updateIngresosDiarioDto.sucursalId });

      if (!sucursalExiste) {
        throw new NotFoundException(`La sucursal con ID ${updateIngresosDiarioDto.sucursalId} no existe`);
      }
      ingreso.sucursal = sucursalExiste;
    }
    Object.assign(ingreso, updateIngresosDiarioDto);
    return await this.ingresoRepository.save(ingreso);
  }

  async remove(id: number) {
    const ingreso = await this.findOne(id);
    await this.sucursalRepository.delete(ingreso)
    return {message: `El ingreso con ID ${id}, ha sido`};
  }
}
