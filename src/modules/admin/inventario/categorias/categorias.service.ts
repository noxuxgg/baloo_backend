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
    const existeCategoria = await this.categoriaRepository.findOne({ where: { nombre } });
    
    if (existeCategoria) {
      throw new BadRequestException(`La categoría ${nombre} ya existe`);
    }
    
    const nuevaCategoria = this.categoriaRepository.create(createCategoriaDto);
    const categoria = await this.categoriaRepository.save(nuevaCategoria);
    return categoria;
  }

  async findAll() {
    const categorias = await this.categoriaRepository.find({ 
      where: { estado: true },
      relations: ['productos']
    });
    return categorias;
  }

  async findOne(id: number) {
    const categoria = await this.categoriaRepository.findOne({ 
      where: { id: id, estado: true },
      relations: ['productos']
    });

    if (!categoria) {
      throw new NotFoundException(`La Categoría con ID ${id} NO existe`);
    }
    return categoria;
  }

  async update(id: number, updateCategoriaDto: UpdateCategoriaDto) {
    const categoria = await this.categoriaRepository.findOneBy({ id: id });
    
    if (!categoria) {
      throw new NotFoundException(`La categoría con ID ${id} no existe`);
    }

    Object.assign(categoria, updateCategoriaDto);
    const categoriaActualizada = await this.categoriaRepository.save(categoria);
    return categoriaActualizada;
  }

  async remove(id: number) {
    const categoria = await this.findOne(id);
    categoria.estado = false;
    await this.categoriaRepository.save(categoria);
    return { message: `La categoría ${categoria.nombre} ha sido deshabilitada` };
  }
}