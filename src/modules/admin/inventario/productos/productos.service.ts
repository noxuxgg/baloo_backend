import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from './entities/producto.entity';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private productoRepository: Repository<Producto>,
  ) {}

  async create(createProductoDto: CreateProductoDto) {
    const { nombre, categoriaId, ...datosProducto } = createProductoDto;
    const existeProducto = await this.productoRepository.findOne({ where: { nombre } });

    if (existeProducto) {
      throw new BadRequestException(`El producto ${nombre} ya existe`);
    }

    const nuevoProducto = this.productoRepository.create({
      ...datosProducto,
      nombre,
      categoria: { id: categoriaId } as any
    });
    
    const producto = await this.productoRepository.save(nuevoProducto);
    return producto;
  }

  async findAll() {
    const productos = await this.productoRepository.find({
      where: { estado: true },
      relations: ['categoria']
    });
    return productos;
  }

  async findOne(id: number) {
    const producto = await this.productoRepository.findOne({
      where: { id: id, estado: true },
      relations: ['categoria']
    });

    if (!producto) {
      throw new NotFoundException(`El Producto con ID ${id} NO existe`);
    }
    return producto;
  }

  async update(id: number, updateProductoDto: UpdateProductoDto) {
    const producto = await this.productoRepository.findOneBy({ id: id });

    if (!producto) {
      throw new NotFoundException(`El producto con ID ${id} no existe`);
    }

    Object.assign(producto, updateProductoDto);
    const productoActualizado = await this.productoRepository.save(producto);
    return productoActualizado;
  }

  async remove(id: number) {
    const producto = await this.findOne(id);
    producto.estado = false;
    await this.productoRepository.save(producto);
    return { message: `El producto ${producto.nombre} ha sido deshabilitado` };
  }
}