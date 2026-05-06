import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pedido } from './entities/pedido.entity';
import { Repository } from 'typeorm';
@Injectable()
export class PedidosService {
  constructor(
    @InjectRepository(Pedido)
    private readonly pedidoRepository: Repository<Pedido>,
  ) { }
  async create(createPedidoDto: CreatePedidoDto) {
    const { clienteId, usuarioId, sucursalId, fechaPedido, fechaEntrega, horaEntrega, cantidadPersonas, estado, lugarEntrega, total, adelanto, saldo, observaciones } = createPedidoDto;
    const pedido = this.pedidoRepository.create({
      cliente: {id: clienteId} as any,
      usuario: {id: usuarioId} as any,
      sucursal: {id: sucursalId} as any,
      fechaPedido: fechaPedido,
      fechaEntrega: fechaEntrega,
      horaEntrega: horaEntrega,
      cantidadPersonas: cantidadPersonas,
      estado: estado,
      lugarEntrega: lugarEntrega,
      total: total,
      adelanto: adelanto,
      saldo: saldo,
      observaciones: observaciones,
    });
    const pedido1 = await this.pedidoRepository.save(pedido);
    return pedido1;
  }

  async findAll() {
    const pedidos = await this.pedidoRepository.find({
      where: { estado: true },
      relations: ['cliente','usuario','sucursal'],
    });
    return pedidos;
  }

  async findOne(id: number) {
    const pedido = await this.pedidoRepository.findOneBy({id: id});
    if(!pedido){
      throw new NotFoundException(`El pedido con ID ${id} no existe`);
    }
    return pedido;
  }

  async update(id: number, updatePedidoDto: UpdatePedidoDto) {
    const pedido = await this.pedidoRepository.findOneBy({id: id});
    if(!pedido){
      throw new NotFoundException(`El pedido con ID ${id} no existe`);
    }
    Object.assign(pedido, updatePedidoDto);
    const pedidoActualizado = await this.pedidoRepository.save(pedido);
    return pedidoActualizado;
  }

  async remove(id: number) {
    const pedido = await this.findOne(id);
    await this.pedidoRepository.delete(id);
    return {message: 'El pedido ha sido eliminado correctamente'};
  }
}
