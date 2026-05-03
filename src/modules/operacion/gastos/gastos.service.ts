import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGastoDto } from './dto/create-gasto.dto';
import { UpdateGastoDto } from './dto/update-gasto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Gasto } from './entities/gasto.entity';
import { Repository } from 'typeorm';
import { Usuario } from '../../admin/usuarios/entities/usuario.entity';
import { Sucursal } from '../../admin/sucursales/entities/sucursale.entity';

@Injectable()
export class GastosService {

  constructor(
    @InjectRepository(Gasto)
    private gastoRepository: Repository<Gasto>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(Sucursal)
    private readonly sucursalRepository: Repository<Sucursal>
  ) { }

  async create(createGastoDto: CreateGastoDto) {
    const { usuarioId, sucursalId, ...datosIngreso } = createGastoDto;
    const usuario = await this.usuarioRepository.findOneBy({ id: usuarioId });
    const sucursal = await this.sucursalRepository.findOneBy({ id: sucursalId });
    if (!usuario) {
      throw new NotFoundException(`No existe el usuario con ID: ${usuarioId}`);
    }
    if (!sucursal) {
      throw new NotFoundException(`No existe la sucursal con ID: ${sucursalId}`);
    }
    const nuevoGasto = this.gastoRepository.create({
      ...datosIngreso,
      usuario,
      sucursal,
    });
    const gasto = await this.gastoRepository.save(nuevoGasto);
    return gasto;
  }

  async findAll() {
    const gastos = await this.gastoRepository.find()
    return gastos;
  }

  async findOne(id: number) {
    const gastos = await this.gastoRepository.findOneBy({ id: id });
    if (!gastos) {
      throw new NotFoundException(`No existe el gasto con ID: ${id}`);
    }
    return gastos;
  }

  async update(id: number, updateGastoDto: UpdateGastoDto) {
    const gasto = await this.gastoRepository.findOne({
      where: { id },
      relations: ['usuario', 'sucursal']
    });

    if (!gasto) {
      throw new NotFoundException(`El ingreso con ID ${id} no existe`);
    }
    if (updateGastoDto.usuarioId) {
      const usuarioExistente = await this.usuarioRepository.findOneBy({ id: updateGastoDto.usuarioId });

      if (!usuarioExistente) {
        throw new NotFoundException(`El usuario con ID ${updateGastoDto.usuarioId} no existe`);
      }
      gasto.usuario = usuarioExistente;
    }
    if (updateGastoDto.sucursalId) {
      const sucursalExiste = await this.sucursalRepository.findOneBy({ id: updateGastoDto.sucursalId });

      if (!sucursalExiste) {
        throw new NotFoundException(`La sucursal con ID ${updateGastoDto.sucursalId} no existe`);
      }
      gasto.sucursal = sucursalExiste;
    }
    Object.assign(gasto, updateGastoDto);
    const gastoActualizado = await this.gastoRepository.save(gasto);
    return gastoActualizado;
  }

  async remove(id: number) {
    await this.findOne(id)
    await this.gastoRepository.delete(id)
    return {message: `El gasto con ID ${id}, ha sido`};
  }
}
