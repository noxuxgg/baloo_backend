import { Injectable } from '@nestjs/common';
import { CreatePagosPedidoDto } from './dto/create-pagos-pedido.dto';
import { UpdatePagosPedidoDto } from './dto/update-pagos-pedido.dto';

@Injectable()
export class PagosPedidoService {
  create(createPagosPedidoDto: CreatePagosPedidoDto) {
    return 'This action adds a new pagosPedido';
  }

  findAll() {
    return `This action returns all pagosPedido`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pagosPedido`;
  }

  update(id: number, updatePagosPedidoDto: UpdatePagosPedidoDto) {
    return `This action updates a #${id} pagosPedido`;
  }

  remove(id: number) {
    return `This action removes a #${id} pagosPedido`;
  }
}
