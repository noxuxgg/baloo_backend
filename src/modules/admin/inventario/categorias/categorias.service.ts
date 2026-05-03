import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from './entities/categoria.entity';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectRepository(Categoria)
    private categoriaRepository: Repository<Categoria>,
  ) {}

  async create(createCategoriaDto: CreateCategoriaDto) {
    const { nombre } = createCategoriaDto;
    const existe = await this.categoriaRepository.findOne({ where: { nombre } });
    if (existe) throw new BadRequestException(`La categoría ${nombre} ya existe`);

    const nuevaCategoria = this.categoriaRepository.create(createCategoriaDto);
    return await this.categoriaRepository.save(nuevaCategoria);
  }
  
  async update(id: number, updateCategoriaDto: UpdateCategoriaDto) {
    const categoria = await this.findOne(id);
    // Fusionamos los cambios del DTO con la entidad existente
    Object.assign(categoria, updateCategoriaDto);
    return await this.categoriaRepository.save(categoria);
  }

  async findAll() {
    // Siguiendo tu estándar de sucursales:
    return await this.categoriaRepository.find({ 
    where: { estado: true }, 
      relations: ['productos'] 
    });
  }

  async findOne(id: number) {
    // Validamos ID y estado activo
    const categoria = await this.categoriaRepository.findOne({ 
      where: { id, estado: true },
      relations: ['productos']
    });
      
    if (!categoria) {
      throw new NotFoundException(`La Categoría con ID ${id} NO existe o está deshabilitada`);
    }
    return categoria;
  }

  async remove(id: number) {
    const categoria = await this.findOne(id); // Reutiliza la validación
    categoria.estado = false;
    await this.categoriaRepository.save(categoria);
    return { message: `La categoría ${categoria.nombre} ha sido deshabilitada` };
  }
}