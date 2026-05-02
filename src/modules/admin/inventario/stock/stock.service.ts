import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stock } from './entities/stock.entity';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(Stock)
    private stockRepository: Repository<Stock>
  ) {}

  async create(createStockDto: CreateStockDto) {
    const { productoId, cantidad } = createStockDto;

    const nuevoStock = this.stockRepository.create({
      cantidad,
      producto: { id: productoId }
    });

    return await this.stockRepository.save(nuevoStock);
  }

  async findAll() {
    return await this.stockRepository.find({ relations: ['producto'] });
  }

  async findOne(id: number) {
    const registro = await this.stockRepository.findOne({
      where: { id },
      relations: ['producto']
    });
    if (!registro) throw new NotFoundException(`Registro de stock #${id} no existe`);
    return registro;
  }

  // --- ESTOS SON LOS MÉTODOS QUE FALTABAN ---

  async update(id: number, updateStockDto: UpdateStockDto) {
    const registro = await this.findOne(id);
    
    // Si el DTO trae un nuevo productoId, lo actualizamos correctamente
    if (updateStockDto.productoId) {
        registro.producto = { id: updateStockDto.productoId } as any;
    }
    
    Object.assign(registro, updateStockDto);
    return await this.stockRepository.save(registro);
  }

  async remove(id: number) {
    const registro = await this.findOne(id);
    await this.stockRepository.remove(registro);
    return { message: `Registro de stock #${id} eliminado correctamente` };
  }
}