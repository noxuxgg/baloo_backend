import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsuariosService {

  constructor(@InjectRepository(Usuario) private usuarioRepository: Repository<Usuario>) {

  }

  async create(createUsuarioDto: CreateUsuarioDto) {
    const { nombreUsuario } = createUsuarioDto;
    // Verificando si existe el nombre de Usuario
    const existeUsuario = await this.usuarioRepository.findOne({ where: { nombreUsuario: nombreUsuario } });
    if (existeUsuario) {
      throw new BadRequestException(`El nombre de usuario ${nombreUsuario} ya está en uso`);
    }
    // Encriptación de contrasenia
    const hashPassword = await bcrypt.hash(createUsuarioDto.contrasenia, 12);

    const nuevoUsuario = this.usuarioRepository.create({
      nombreUsuario,
      contrasenia: hashPassword
    });
    await this.usuarioRepository.save(nuevoUsuario);
    const { contrasenia, ...restoDatos } = nuevoUsuario;
    return restoDatos;
  }

  async findAll() {
    const usuarios = await this.usuarioRepository.findBy({ estado: true });
    return usuarios;
  }

  async findOne(id: string) {
    const usuario = await this.usuarioRepository.findOneBy({ id: id });
    if (!usuario) {
      throw new NotFoundException(`El usuario con ID ${id} NO existe`);
    }
    return usuario;
  }

  async update(id: string, updateUsuarioDto: UpdateUsuarioDto) {
    const usuario = await this.findOne(id);
    Object.assign(usuario, updateUsuarioDto);
    if (updateUsuarioDto.contrasenia) {
      usuario.contrasenia = await bcrypt.hash(updateUsuarioDto.contrasenia, 12);
    }
    await this.usuarioRepository.save(usuario);
    const { contrasenia, ...restoDatos } = usuario;
    return restoDatos;
  }

  async remove(id: string) {
    const usuario = await this.findOne(id);
    usuario.estado = false;
    await this.usuarioRepository.save(usuario);
    return {message: `El usuario ${usuario.nombreUsuario} ha sido deshabilitado`};
  }

  // Login
  async findOneByUser(nombreUsuario: string) {
    const usuario = await this.usuarioRepository.findOneBy({ nombreUsuario: nombreUsuario });
    if (!usuario) throw new NotFoundException(`El usuario: ${nombreUsuario} no existe`);
    return usuario
  }
}
