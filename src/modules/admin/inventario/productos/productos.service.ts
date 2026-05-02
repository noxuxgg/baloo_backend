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
    private productoRepository: Repository<Producto>
  ) {}

  async create(createProductoDto: CreateProductoDto) {
    const { nombre, categoriaId, ...datos } = createProductoDto;

    // Validación de duplicados (como hicieron tus compañeros)
    const existe = await this.productoRepository.findOne({ where: { nombre } });
    if (existe) {
      throw new BadRequestException(`El producto "${nombre}" ya existe en la pastelería`);
    }

    const nuevoProducto = this.productoRepository.create({
      ...datos,
      nombre,
      categoria: { id: categoriaId } // Mapeo manual para asegurar la relación
    });

    return await this.productoRepository.save(nuevoProducto);
  }

  async findAll() {
    return await this.productoRepository.find({ 
      where: { estado: true },
      relations: ['categoria'] 
    });
  }

  async findOne(id: number) {
    const producto = await this.productoRepository.findOne({
      where: { id },
      relations: ['categoria', 'stocks']
    });
    if (!producto) throw new NotFoundException(`Producto con ID ${id} no existe`);
    return producto;
  }
  
  async update(id: number, updateProductoDto: UpdateProductoDto) {
    const producto = await this.findOne(id);
    const { categoriaId, ...datos } = updateProductoDto;

    // Si el DTO trae un nuevo categoriaId, actualizamos la relación
    if (categoriaId) {
      producto.categoria = { id: categoriaId } as any;
    }

    Object.assign(producto, datos);
    return await this.productoRepository.save(producto);
  }

  async remove(id: number) {
    const producto = await this.findOne(id);
    // Siguiendo la lógica de tus compañeros, podemos usar un "borrado lógico"
    producto.estado = false; 
    await this.productoRepository.save(producto);
    return { message: `Producto "${producto.nombre}" deshabilitado correctamente` };
  }
}