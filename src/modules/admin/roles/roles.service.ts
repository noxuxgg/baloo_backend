import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {

  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>
  ) { }

  async create(createRoleDto: CreateRoleDto) {
    const { nombre, descripcion } = createRoleDto;
    const rol = await this.roleRepository.create({
      nombre: nombre,
      descripcion: descripcion
    })
    const rol1 = this.roleRepository.save(rol);
    return rol1;
  }

  async findAll() {
    const roles = await this.roleRepository.find()
    return roles;
  }

  async findOne(id: number) {
    const rol = await this.roleRepository.findOneBy({id: id});
    if (!rol) {
      throw new NotFoundException(`El rol con ID ${id} no existe`);
    }
    return rol;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const rol = await this.roleRepository.findOneBy({ id: id });
    if (!rol) {
      throw new NotFoundException(`El rol con ID ${id} no existe`);
    }
    Object.assign(rol, updateRoleDto);
    const rolActualizado = await this.roleRepository.save(rol);
    return rolActualizado;
  }

  async remove(id: number) {
    const rol = await this.findOne(id);
    const nombre = rol.nombre;
    await this.roleRepository.delete(rol)
    return {message: `El rol ${nombre} ha sido eliminado`};
  }
}
