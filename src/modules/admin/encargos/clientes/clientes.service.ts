import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
import { Repository } from 'typeorm';
@Injectable()
export class ClientesService {

  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
  ) { }
  async create(createClienteDto: CreateClienteDto) {
    const { carnet, complemento, nombre, apellido, telefono, estado } = createClienteDto;
    const existe = await this.clienteRepository.findOneBy({carnet: carnet});
    if(existe){
      throw new BadRequestException(`El cliente con carnet ${carnet} ya existe`);
    }
    const cliente = await this.clienteRepository.create({
      carnet: carnet,
      complemento: complemento,
      nombre: nombre,
      apellido: apellido,
      telefono: telefono,
      estado: estado
    })
    const cliente1 = await this.clienteRepository.save(cliente);
    return cliente1;
  }

  async findAll() {
    const clientes = await this.clienteRepository.find({
      where: { estado: true }
    });
    return clientes;
  }
  async findInactives() {
    const clientes = await this.clienteRepository.find({
      where: { estado: false }
    });
    return clientes;
  }

  async findOne(id: number) {
    const cliente = await this.clienteRepository.findOneBy({id: id})
    if(!cliente){
      throw new NotFoundException(`Cliente no encontrado con el id ${id}`);
    }
    return cliente;
  }

  async update(id: number, updateClienteDto: UpdateClienteDto) {
    const cliente = await this.clienteRepository.findOneBy({id: id});
    if(!cliente){
      throw new NotFoundException(`Cliente no encontrado con el id ${id}`);
    }
    if(updateClienteDto.carnet){
      const existe = await this.clienteRepository.findOneBy({carnet: updateClienteDto.carnet});
      if(existe && existe.id !== id){
        throw new NotFoundException(`El cliente con carnet ${updateClienteDto.carnet} ya esta registrado`);
      }
    }
    Object.assign(cliente, updateClienteDto);
    const clienteActualizado = await this.clienteRepository.save(cliente);
    return clienteActualizado;
  }

  async remove(id: number) {
    const cliente = await this.findOne(id);
    if (!cliente) {
    throw new NotFoundException(`El cliente con ID ${id} no existe`);
  }
    cliente.estado = false;  
    await this.clienteRepository.save(cliente)
    return {message: `El cliente ${cliente.nombre} ha sido deshabilitado correctamente`}
  }
}
