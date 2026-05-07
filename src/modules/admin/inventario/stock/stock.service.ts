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

    // 1. Validación de duplicados: No permitir duplicar stock activo para el mismo producto/sucursal
    const existeStock = await this.stockRepository.findOne({
      where: { 
        productoId: productoId, 
        sucursalId: sucursalId,
        estado: true // Solo validamos contra los que están activos
      },
    });

    if (existeStock) {
      throw new BadRequestException(
        `Ya existe un registro de stock activo para el producto ${productoId} en esta sucursal.`,
      );
    }

    const nuevoStock = this.stockRepository.create(createStockDto);
    const guardado = await this.stockRepository.save(nuevoStock);

    return await this.findOne(guardado.id);
  }

  async findAll() {
    // Siguiendo tu estándar: Solo los activos
    return await this.stockRepository.find({
      where: { estado: true },
      relations: ['producto', 'sucursal'],
    });
  }

  async findOne(id: number) {
    // Validamos ID y estado activo, incluyendo relaciones para el frontend
    const registro = await this.stockRepository.findOne({
      where: { id: id, estado: true },
      relations: ['producto', 'sucursal'],
    });

    if (!registro) {
      throw new NotFoundException(`El registro de Stock con ID ${id} NO existe o está deshabilitado`);
    }
    return registro;
  }

  async update(id: number, updateStockDto: UpdateStockDto) {
    // Reutilizamos findOne para asegurar que solo editamos registros activos
    const registro = await this.findOne(id);

    // Fusionamos cambios de cantidad, stockMinimo, etc.
    Object.assign(registro, updateStockDto);

    try {
      return await this.stockRepository.save(registro);
    } catch (error) {
      console.error('--- Error al actualizar Stock ---', error);
      throw new BadRequestException('No se pudo actualizar el registro de stock');
    }
  }

  async actualizarUnidades(productoId: number, sucursalId: number, cantidadModificada: number) {
    // 1. Buscamos el registro específico para esa sucursal y producto
    const registro = await this.stockRepository.findOne({
      where: { 
        productoId: productoId, 
        sucursalId: sucursalId,
        estado: true 
      }
    });

    // 2. Validación de existencia (DEBE IR PRIMERO)
    if (!registro) {
      throw new NotFoundException(`No se encontró stock activo para el producto #${productoId} en la sucursal #${sucursalId}.`);
    }

    // 3. Calculamos el nuevo stock de forma segura usando la variable correcta
    const nuevoStock = registro.cantidad + cantidadModificada;

    // 4. Validación de seguridad: No permitir que el inventario baje de 0
    if (nuevoStock < 0) {
      throw new BadRequestException('La operación resultaría en stock negativo. Verifique las unidades disponibles.');
    }

    // 5. Asignamos el nuevo valor calculado y guardamos en PostgreSQL
    registro.cantidad = nuevoStock;
    
    return await this.stockRepository.save(registro);
  }

  async remove(id: number) {
    // 1. Buscamos y validamos existencia activa
    const registro = await this.findOne(id);
    
    // 2. Borrado Lógico (el estándar que pediste)
    registro.estado = false;
    await this.stockRepository.save(registro);

    return {
      message: `El registro de stock #${id} ha sido deshabilitado correctamente`,
    };
  }
}