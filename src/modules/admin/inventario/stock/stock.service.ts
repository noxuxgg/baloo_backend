import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stock } from './entities/stock.entity';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(Stock)
    private readonly stockRepository: Repository<Stock>,
  ) {}

  async create(createStockDto: CreateStockDto) {
    const { productoId, sucursalId } = createStockDto;

    const existeStock = await this.stockRepository.findOne({
      where: { 
        productoId, 
        sucursalId,
        estado: true 
      },
    });

    if (existeStock) {
      throw new BadRequestException(`Ya existe un registro de stock para el producto ${productoId} en esta sucursal`);
    }

    const nuevoStock = this.stockRepository.create(createStockDto);
    const stock = await this.stockRepository.save(nuevoStock);
    return stock;
  }

  async findAll() {
    const stocks = await this.stockRepository.find({
      where: { estado: true },
      relations: ['producto', 'sucursal'],
    });
    return stocks;
  }

  async findOne(id: number) {
    const stock = await this.stockRepository.findOne({
      where: { id: id, estado: true },
      relations: ['producto', 'sucursal'],
    });

    if (!stock) {
      throw new NotFoundException(`El registro de Stock con ID ${id} NO existe`);
    }
    return stock;
  }

  async update(id: number, updateStockDto: UpdateStockDto) {
    const stock = await this.stockRepository.findOneBy({ id: id });

    if (!stock) {
      throw new NotFoundException(`El registro de stock con ID ${id} no existe`);
    }

    Object.assign(stock, updateStockDto);
    const stockActualizado = await this.stockRepository.save(stock);
    return stockActualizado;
  }

  async actualizarUnidades(productoId: number, sucursalId: number, cantidad: number) {
    const stock = await this.stockRepository.findOne({
      where: { 
        productoId, 
        sucursalId,
        estado: true 
      }
    });

    if (!stock) {
      throw new NotFoundException(`No se encontró stock para el producto ${productoId} en la sucursal ${sucursalId}`);
    }

    const nuevoTotal = stock.cantidad + cantidad;

    if (nuevoTotal < 0) {
      throw new BadRequestException('La operación resultaría en stock negativo');
    }

    stock.cantidad = nuevoTotal;
    return await this.stockRepository.save(stock);
  }

  async remove(id: number) {
    const stock = await this.findOne(id);
    stock.estado = false;
    await this.stockRepository.save(stock);
    return { message: `El registro de stock con ID ${id} ha sido deshabilitado` };
  }
}