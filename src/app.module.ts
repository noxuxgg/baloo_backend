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
import { AuthModule } from './modules/auth/auth.module';
import { VentasRootModule } from './modules/admin/ventas/ventas.module';
import { EncargosModule } from './modules/admin/encargos/encargos.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }),
  TypeOrmModule.forRoot({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    host: process.env.DATABASE_URL ? undefined : 'localhost',
    port: process.env.DATABASE_URL ? undefined : 5436,
    username: process.env.DATABASE_URL ? undefined : 'postgres',
    password: process.env.DATABASE_URL ? undefined : 'postgresql',
    database: process.env.DATABASE_URL ? undefined : 'bdBaloo',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false,
    synchronize: true,
    extra: {
      options: '-c timezone=America/La_Paz'
    }
  }),
    UsersModule,
    InventarioModule,
    UsuariosModule,
    RolesModule,
    SucursalesModule,
    ReportesModule,
    GastosModule,
    IngresosDiariosModule,
    AuthModule,
    VentasRootModule,
    EncargosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
