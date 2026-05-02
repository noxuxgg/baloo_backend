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

  async findAll() {
    return await this.categoriaRepository.find({ relations: ['productos'] });
  }

  async findOne(id: number) {
    const categoria = await this.categoriaRepository.findOneBy({ id });
    if (!categoria) throw new NotFoundException(`Categoría con ID ${id} no encontrada`);
    return categoria;
  }
  
  async update(id: number, updateCategoriaDto: UpdateCategoriaDto) {
    const categoria = await this.findOne(id);
    // Fusionamos los cambios del DTO con la entidad existente
    Object.assign(categoria, updateCategoriaDto);
    return await this.categoriaRepository.save(categoria);
  }

  async remove(id: number) {
    const categoria = await this.findOne(id);
    // Eliminación física de la categoría
    await this.categoriaRepository.remove(categoria);
    return { message: `Categoría "${categoria.nombre}" eliminada correctamente` };
  }
}