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
  imports: [ConfigModule.forRoot(),
  TypeOrmModule.forRoot({
    type: 'postgres',
    url: process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_WJTUQEBfVa37@ep-sparkling-bonus-ap6chxz3.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: true,
    ssl: true,
    extra: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
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
