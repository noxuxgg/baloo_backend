import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../../users/dto/create-user.dto';

@Injectable()
export class UsuariosService {

  constructor(@InjectRepository(Usuario) private usuarioRepository: Repository<Usuario>){

  }

  async create(createUsuarioDto: CreateUsuarioDto) {

    const { nombreUsuario, contrasenia } = createUsuarioDto
    // Verificando si existe el nombre de Usuario
    const existeUsuario = await this.usuarioRepository.findOne({where: {nombreUsuario: nombreUsuario}})
    if(existeUsuario){
      throw new BadRequestException(`El nombre de usuario ${nombreUsuario} ya está en uso`)
    }

    return 'This action adds a new usuario';
  }

  findAll() {
    return `This action returns all usuarios`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usuario`;
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return `This action updates a #${id} usuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }

  // Login
  async findOneByUser(nombreUsuario: string){
    const usuario = await this.usuarioRepository.findOneBy({nombreUsuario: nombreUsuario});
    if(!usuario) throw new NotFoundException(`El usuario: ${nombreUsuario} no existe`);
    return usuario
  }
}
