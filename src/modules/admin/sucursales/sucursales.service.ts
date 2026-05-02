import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSucursaleDto } from './dto/create-sucursale.dto';
import { UpdateSucursaleDto } from './dto/update-sucursale.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Sucursal } from './entities/sucursale.entity';
import { And, Repository } from 'typeorm';

@Injectable()
export class SucursalesService {

  constructor(
    @InjectRepository(Sucursal)
    private sucursalRepository: Repository<Sucursal>
  ) { }

  async create(createSucursaleDto: CreateSucursaleDto) {
    const { nombre } = createSucursaleDto;
    const existeSucursal = await this.sucursalRepository.findOne({ where: { nombre } });
    if (existeSucursal) {
      throw new BadRequestException(`La sucursal ${nombre} ya existe`);
    }
    const nuevaSucursal = this.sucursalRepository.create(createSucursaleDto);
    const sucursal = await this.sucursalRepository.save(nuevaSucursal);
    return sucursal;
  }

  async findAll() {
    const sucursales = await this.sucursalRepository.findBy({ estado: true });
    return sucursales;
  }

  async findOne(id: number) {
    const sucursal = await this.sucursalRepository.findOneBy({ id: id, estado: true });
    if (!sucursal) {
      throw new NotFoundException(`La Sucursal con ID ${id} NO existe`);
    }
    return sucursal;
  }

  async update(id: number, updateSucursaleDto: UpdateSucursaleDto) {
    const sucursal = await this.sucursalRepository.findOneBy({ id: id });
    if (!sucursal) {
      throw new NotFoundException(`La sucursal con ID ${id} no existe`);
    }
    Object.assign(sucursal, updateSucursaleDto);
    const sucursalActualizada = await this.sucursalRepository.save(sucursal)
    return sucursalActualizada;
  }

  async remove(id: number) {
    const sucursal = await this.findOne(id);
    sucursal.estado = false;
    await this.sucursalRepository.save(sucursal);
    return { message: `La sucursal ${sucursal.nombre} ha sido deshabilitada` };
  }
}
