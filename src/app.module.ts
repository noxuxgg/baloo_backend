import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventarioModule } from './modules/admin/inventario/inventario.module';
import { UsuariosModule } from './modules/admin/usuarios/usuarios.module';
import { RolesModule } from './modules/admin/roles/roles.module';
import { SucursalesModule } from './modules/admin/sucursales/sucursales.module';
import { ReportesModule } from './modules/admin/reportes/reportes.module';
import { GastosModule } from './modules/operacion/gastos/gastos.module';
import { IngresosDiariosModule } from './modules/operacion/ingresos-diarios/ingresos-diarios.module';

@Module({
  imports: [ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5436,
      username: 'postgres',
      password: 'postgresql',
      database: 'bdBaloo',
      entities: [
        __dirname + '/../**/*.entity{.ts,.js}'
      ],
      synchronize: false
    }),
    UsersModule,
    InventarioModule,
    UsuariosModule,
    RolesModule,
    SucursalesModule,
    ReportesModule,
    GastosModule,
    IngresosDiariosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
