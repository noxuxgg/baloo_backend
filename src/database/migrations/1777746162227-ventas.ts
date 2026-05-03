import { MigrationInterface, QueryRunner } from "typeorm";

export class Ventas1777746162227 implements MigrationInterface {
    name = 'Ventas1777746162227'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "roles" ("id" SERIAL NOT NULL, "nombre" character varying NOT NULL, "descripcion" character varying NOT NULL, CONSTRAINT "UQ_a5be7aa67e759e347b1c6464e10" UNIQUE ("nombre"), CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "reportes" ("id" SERIAL NOT NULL, "tipo" character varying NOT NULL, "fechaInicio" TIMESTAMP NOT NULL, "fechaFin" TIMESTAMP NOT NULL, "usuarioId" uuid, CONSTRAINT "PK_4204634633cb4099bc06b27a17e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "gastos" ("id" SERIAL NOT NULL, "fecha" TIMESTAMP NOT NULL DEFAULT now(), "monto" numeric(10,2) NOT NULL DEFAULT '0', "motivo" text NOT NULL, "personaRecibe" text NOT NULL, "usuarioId" uuid, "sucursalId" integer, CONSTRAINT "PK_2b6965305b864a1ed8e6f6bf586" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "usuarios" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nombreUsuario" character varying NOT NULL, "contrasenia" character varying NOT NULL, "estado" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_b948c9bc89671151c8ab12d409d" UNIQUE ("nombreUsuario"), CONSTRAINT "PK_d7281c63c176e152e4c531594a8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ingresos_diarios" ("id" SERIAL NOT NULL, "fecha" TIMESTAMP NOT NULL DEFAULT now(), "total" numeric(10,2) NOT NULL DEFAULT '0', "observaciones" text, "usuarioId" uuid, "sucursalId" integer, CONSTRAINT "PK_a097f799030920ba162a01a2154" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sucursales" ("id" SERIAL NOT NULL, "nombre" character varying NOT NULL, "direccion" character varying NOT NULL, "telefono" character varying, "estado" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_30d650c6141b4c307be83e9b0a9" UNIQUE ("nombre"), CONSTRAINT "PK_c2232960c9e458db5b18d35eeba" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categorias" ("id" SERIAL NOT NULL, "nombre" character varying NOT NULL, "descripcion" character varying, CONSTRAINT "PK_3886a26251605c571c6b4f861fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "stock" ("id" SERIAL NOT NULL, "cantidad" integer NOT NULL, "stock_minimo" integer NOT NULL, "sucursal_id" integer NOT NULL, "productoId" integer, CONSTRAINT "PK_092bc1fc7d860426a1dec5aa8e9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "productos" ("id" SERIAL NOT NULL, "nombre" character varying NOT NULL, "precio" numeric(10,2) NOT NULL, "estado" boolean NOT NULL DEFAULT true, "categoriaId" integer, CONSTRAINT "PK_04f604609a0949a7f3b43400766" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "detalle_venta" ("id" SERIAL NOT NULL, "cantidad" integer NOT NULL, "precio_unitario" numeric NOT NULL, "subtotal" numeric NOT NULL, "venta_id" integer, "producto_id" integer, CONSTRAINT "PK_15e83370f604ee4b71e7299514e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pagos" ("id" SERIAL NOT NULL, "metodo" character varying NOT NULL, "monto" numeric NOT NULL, "fecha" TIMESTAMP NOT NULL, "venta_id" integer, CONSTRAINT "PK_37321ca70a2ed50885dc205beb2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ventas" ("id" SERIAL NOT NULL, "fecha" TIMESTAMP NOT NULL, "total" numeric NOT NULL, "usuario_id" integer NOT NULL, "sucursal_id" integer NOT NULL, CONSTRAINT "PK_b8b73abe8561829c019531d9a2e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "usuarioRol" ("usuarioId" uuid NOT NULL, "rolId" integer NOT NULL, CONSTRAINT "PK_1dc8ce65be4c587ef095c5c40d8" PRIMARY KEY ("usuarioId", "rolId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_8c7f778e9f1ddc844f418466d6" ON "usuarioRol" ("usuarioId") `);
        await queryRunner.query(`CREATE INDEX "IDX_145990737fa3c26ee24db12da6" ON "usuarioRol" ("rolId") `);
        await queryRunner.query(`ALTER TABLE "reportes" ADD CONSTRAINT "FK_0133a02f6c44ee667565d9e2170" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "gastos" ADD CONSTRAINT "FK_03b9b6f9ce55fecf2d88be7d82c" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "gastos" ADD CONSTRAINT "FK_1b6ad7767fe4cb8765e3041902d" FOREIGN KEY ("sucursalId") REFERENCES "sucursales"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ingresos_diarios" ADD CONSTRAINT "FK_be8ef49a75689608a37645cbd4b" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ingresos_diarios" ADD CONSTRAINT "FK_494d86898f60bdc5ef91e951721" FOREIGN KEY ("sucursalId") REFERENCES "sucursales"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "stock" ADD CONSTRAINT "FK_579a0fda424b09557f1160d942f" FOREIGN KEY ("productoId") REFERENCES "productos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "productos" ADD CONSTRAINT "FK_aee00189e42dd8880cdfe1bb1e7" FOREIGN KEY ("categoriaId") REFERENCES "categorias"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "detalle_venta" ADD CONSTRAINT "FK_7a19a69d52a6ee8e62f0a1b4103" FOREIGN KEY ("venta_id") REFERENCES "ventas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "detalle_venta" ADD CONSTRAINT "FK_1ec9a5c8b5c638129f1b4b0e3df" FOREIGN KEY ("producto_id") REFERENCES "productos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pagos" ADD CONSTRAINT "FK_4c86df5e03d591485cb8fd20e96" FOREIGN KEY ("venta_id") REFERENCES "ventas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "usuarioRol" ADD CONSTRAINT "FK_8c7f778e9f1ddc844f418466d6c" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "usuarioRol" ADD CONSTRAINT "FK_145990737fa3c26ee24db12da66" FOREIGN KEY ("rolId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuarioRol" DROP CONSTRAINT "FK_145990737fa3c26ee24db12da66"`);
        await queryRunner.query(`ALTER TABLE "usuarioRol" DROP CONSTRAINT "FK_8c7f778e9f1ddc844f418466d6c"`);
        await queryRunner.query(`ALTER TABLE "pagos" DROP CONSTRAINT "FK_4c86df5e03d591485cb8fd20e96"`);
        await queryRunner.query(`ALTER TABLE "detalle_venta" DROP CONSTRAINT "FK_1ec9a5c8b5c638129f1b4b0e3df"`);
        await queryRunner.query(`ALTER TABLE "detalle_venta" DROP CONSTRAINT "FK_7a19a69d52a6ee8e62f0a1b4103"`);
        await queryRunner.query(`ALTER TABLE "productos" DROP CONSTRAINT "FK_aee00189e42dd8880cdfe1bb1e7"`);
        await queryRunner.query(`ALTER TABLE "stock" DROP CONSTRAINT "FK_579a0fda424b09557f1160d942f"`);
        await queryRunner.query(`ALTER TABLE "ingresos_diarios" DROP CONSTRAINT "FK_494d86898f60bdc5ef91e951721"`);
        await queryRunner.query(`ALTER TABLE "ingresos_diarios" DROP CONSTRAINT "FK_be8ef49a75689608a37645cbd4b"`);
        await queryRunner.query(`ALTER TABLE "gastos" DROP CONSTRAINT "FK_1b6ad7767fe4cb8765e3041902d"`);
        await queryRunner.query(`ALTER TABLE "gastos" DROP CONSTRAINT "FK_03b9b6f9ce55fecf2d88be7d82c"`);
        await queryRunner.query(`ALTER TABLE "reportes" DROP CONSTRAINT "FK_0133a02f6c44ee667565d9e2170"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_145990737fa3c26ee24db12da6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8c7f778e9f1ddc844f418466d6"`);
        await queryRunner.query(`DROP TABLE "usuarioRol"`);
        await queryRunner.query(`DROP TABLE "ventas"`);
        await queryRunner.query(`DROP TABLE "pagos"`);
        await queryRunner.query(`DROP TABLE "detalle_venta"`);
        await queryRunner.query(`DROP TABLE "productos"`);
        await queryRunner.query(`DROP TABLE "stock"`);
        await queryRunner.query(`DROP TABLE "categorias"`);
        await queryRunner.query(`DROP TABLE "sucursales"`);
        await queryRunner.query(`DROP TABLE "ingresos_diarios"`);
        await queryRunner.query(`DROP TABLE "usuarios"`);
        await queryRunner.query(`DROP TABLE "gastos"`);
        await queryRunner.query(`DROP TABLE "reportes"`);
        await queryRunner.query(`DROP TABLE "roles"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
