import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDetalleTortaDto } from './dto/create-detalle-torta.dto';
import { UpdateDetalleTortaDto } from './dto/update-detalle-torta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DetalleTorta } from './entities/detalle-torta.entity';
import { Repository } from 'typeorm';
@Injectable()
export class DetalleTortaService {

  constructor(
    @InjectRepository(DetalleTorta)
    private readonly detalleTortaRepository: Repository<DetalleTorta>,
  ) { }
  async create(createDetalleTortaDto: CreateDetalleTortaDto) {
    const {pedidoId, sabor, color, textoTorta, decoracion, forma} = createDetalleTortaDto;
    const detalleTorta = await this.detalleTortaRepository.create({
      pedido: {id: pedidoId} as any,
      sabor: sabor,
      color: color,
      textoTorta: textoTorta,
      decoracion: decoracion,
      forma: forma,
    });
    const detalleTorta1 = await this.detalleTortaRepository.save(detalleTorta);
    return detalleTorta1;
  }

  async findAll() {
    const detalleTortas = await this.detalleTortaRepository.find();
    return detalleTortas;
  }

  async findOne(id: number) {
    const detalleTorta = await this.detalleTortaRepository.findOneBy({id: id});
    if (!detalleTorta){
      throw new NotFoundException(`El detalle de torta con ID ${id} no existe`);
    }
    return detalleTorta;
  }

  async update(id: number, updateDetalleTortaDto: UpdateDetalleTortaDto) {
    const detalleTorta = await this.detalleTortaRepository.findOneBy({id: id});
    if (!detalleTorta){
      throw new NotFoundException(`El detalle de torta con ID ${id} no existe`);
    }
    Object.assign(detalleTorta, updateDetalleTortaDto);
    const detalleTortaActualizado = await this.detalleTortaRepository.save(detalleTorta);
    return detalleTortaActualizado;
  }

  async remove(id: number) {
    const detalleTorta = await this.findOne(id);
    await this.detalleTortaRepository.delete(id);
    return {message: 'El detalle de torta ha sido eliminado correctamente'};
  }
}
