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
    private readonly productoRepository: Repository<Producto>
  ) {}

  async create(createProductoDto: CreateProductoDto) {
    const { nombre } = createProductoDto;

    // 1. Validación de duplicados (siguiendo tu estándar de sucursales)
    const existeProducto = await this.productoRepository.findOne({ where: { nombre } });
    if (existeProducto) {
      throw new BadRequestException(`El producto "${nombre}" ya existe en Baloo Pastelería`);
    }

    const nuevoProducto = this.productoRepository.create(createProductoDto);
    const guardado = await this.productoRepository.save(nuevoProducto);
  
    // Retornamos el objeto completo con sus relaciones
    return await this.findOne(guardado.id);
  }

  async findAll() {
    // Solo traemos los activos, tal cual lo haces en sucursales
    return await this.productoRepository.find({ 
      where: { estado: true },
      relations: ['categoria'] 
    });
  }

  async findOne(id: number) {
    // Filtramos por ID y por estado: true para mantener el estándar
    const producto = await this.productoRepository.findOne({
      where: { id: id, estado: true },
      relations: ['categoria']
    });

    if (!producto) {
      throw new NotFoundException(`El Producto con ID ${id} NO existe o está deshabilitado`);
    }
    return producto;
  }
  
  async update(id: number, updateProductoDto: UpdateProductoDto) {
    // Reutilizamos findOne para validar existencia y estado activo
    const producto = await this.findOne(id);

    // Fusionamos los cambios (incluyendo categoriaId si viene en el DTO)
    Object.assign(producto, updateProductoDto);
    
    return await this.productoRepository.save(producto);
  }

  async remove(id: number) {
    // 1. Buscamos y validamos (si ya está en false, findOne lanzará la excepción)
    const producto = await this.findOne(id);
    
    // 2. Borrado Lógico
    producto.estado = false; 
    await this.productoRepository.save(producto);
    
    return { message: `El producto "${producto.nombre}" ha sido deshabilitado correctamente` };
  }
}