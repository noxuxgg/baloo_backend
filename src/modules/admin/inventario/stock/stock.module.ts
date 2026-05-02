import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // Importante
import { StockService } from './stock.service';
import { StockController } from './stock.controller';
import { Stock } from './entities/stock.entity'; // Importante

@Module({
  imports: [TypeOrmModule.forFeature([Stock])], // Registra la tabla
  controllers: [StockController],
  providers: [StockService],
  exports: [TypeOrmModule],
})
export class StockModule {}