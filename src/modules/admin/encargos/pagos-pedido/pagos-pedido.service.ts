import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePagosPedidoDto } from './dto/create-pagos-pedido.dto';
import { UpdatePagosPedidoDto } from './dto/update-pagos-pedido.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PagosPedido } from './entities/pagos-pedido.entity';
import { Repository } from 'typeorm';
@Injectable()
export class PagosPedidoService {

  constructor(
    @InjectRepository(PagosPedido)
    private readonly pagosPedidoRepository: Repository<PagosPedido>,
  ) { }

  async create(createPagosPedidoDto: CreatePagosPedidoDto) {
    const { pedidoId, metodo, monto, fecha } = createPagosPedidoDto;
    const pagosPedido = await this.pagosPedidoRepository.create({
      pedido: { id: pedidoId } as any,
      metodo: metodo,
      monto: monto,
      fecha: fecha,
    });
    const pagosPedido1 = this.pagosPedidoRepository.save(pagosPedido);
    return pagosPedido1;
  }

  async findAll() {
    const pagosPedido = await this.pagosPedidoRepository.find()
    return pagosPedido;
  }

  async findOne(id: number) {
    const pagosPedido = await this.pagosPedidoRepository.findOneBy({id:id})
    if (!pagosPedido){
      throw new NotFoundException(`El pago con ID ${id} no existe`);
    }
    return pagosPedido;
  }

  async update(id: number, updatePagosPedidoDto: UpdatePagosPedidoDto) {
    const pagosPedido = await this.pagosPedidoRepository.findOneBy({id:id});
    if (!pagosPedido){
      throw new NotFoundException(`El pago con ID ${id} no existe`);
    }
    Object.assign(pagosPedido, updatePagosPedidoDto);
    const pagosPedidoActualizado = await this.pagosPedidoRepository.save(pagosPedido);
    return pagosPedidoActualizado;
  }

  async remove(id: number) {
    const pagosPedido = await this.findOne(id);
    await this.pagosPedidoRepository.delete(id);
    return {message: 'El pago del pedido ha sido eliminado correctamente'};
  }
}
