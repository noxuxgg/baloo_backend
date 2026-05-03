import { Injectable, NotFoundException } from '@nestjs/common';
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
    const { nombre, apellido, telefono, estado } = createClienteDto;
    const cliente = await this.clienteRepository.create({
      nombre: nombre,
      apellido: apellido,
      telefono: telefono,
      estado: estado
    })
    const cliente1 = this.clienteRepository.save(cliente);
    return cliente1;
  }

  async findAll() {
    const clientes = await this.clienteRepository.find({
      where: { estado: true }
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
