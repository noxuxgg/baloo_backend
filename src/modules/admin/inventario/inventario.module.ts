import { Module } from '@nestjs/common';
import { CategoriasModule } from './categorias/categorias.module';
import { ProductosModule } from './productos/productos.module';
import { StockModule } from './stock/stock.module';

@Module({
  imports: [CategoriasModule, ProductosModule, StockModule]
})
export class InventarioModule {}
