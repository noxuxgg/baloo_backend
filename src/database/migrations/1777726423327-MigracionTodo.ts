import { MigrationInterface, QueryRunner } from "typeorm";

export class MigracionTodo1777726423327 implements MigrationInterface {
    name = 'MigracionTodo1777726423327'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "roles" ("id" SERIAL NOT NULL, "nombre" character varying NOT NULL, "descripcion" character varying NOT NULL, CONSTRAINT "UQ_a5be7aa67e759e347b1c6464e10" UNIQUE ("nombre"), CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "reportes" ("id" SERIAL NOT NULL, "tipo" character varying NOT NULL, "fechaInicio" TIMESTAMP NOT NULL, "fechaFin" TIMESTAMP NOT NULL, "usuarioId" integer, CONSTRAINT "PK_4204634633cb4099bc06b27a17e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sucursales" ("id" SERIAL NOT NULL, "nombre" character varying NOT NULL, "direccion" character varying NOT NULL, "telefono" character varying, "estado" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_30d650c6141b4c307be83e9b0a9" UNIQUE ("nombre"), CONSTRAINT "PK_c2232960c9e458db5b18d35eeba" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "gastos" ("id" SERIAL NOT NULL, "fecha" TIMESTAMP NOT NULL DEFAULT now(), "monto" numeric(10,2) NOT NULL DEFAULT '0', "motivo" text NOT NULL, "personaRecibe" text NOT NULL, "usuarioId" integer, "sucursalId" integer, CONSTRAINT "PK_2b6965305b864a1ed8e6f6bf586" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "usuarios" ("id" SERIAL NOT NULL, "nombreUsuario" character varying NOT NULL, "contrasenia" character varying NOT NULL, "estado" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_b948c9bc89671151c8ab12d409d" UNIQUE ("nombreUsuario"), CONSTRAINT "PK_d7281c63c176e152e4c531594a8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ingresos_diarios" ("id" SERIAL NOT NULL, "fecha" TIMESTAMP NOT NULL DEFAULT now(), "total" numeric(10,2) NOT NULL DEFAULT '0', "observaciones" text, "usuarioId" integer, "sucursalId" integer, CONSTRAINT "PK_a097f799030920ba162a01a2154" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categorias" ("id" SERIAL NOT NULL, "nombre" character varying NOT NULL, "descripcion" character varying, CONSTRAINT "PK_3886a26251605c571c6b4f861fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "productos" ("id" SERIAL NOT NULL, "nombre" character varying NOT NULL, "precio" numeric(10,2) NOT NULL, "estado" boolean NOT NULL DEFAULT true, "categoriaId" integer, CONSTRAINT "PK_04f604609a0949a7f3b43400766" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "stock" ("id" SERIAL NOT NULL, "cantidad" integer NOT NULL, "stock_minimo" integer NOT NULL, "sucursal_id" integer NOT NULL, "productoId" integer, CONSTRAINT "PK_092bc1fc7d860426a1dec5aa8e9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "usuario_rol" ("usuario_id" integer NOT NULL, "rol_id" integer NOT NULL, CONSTRAINT "PK_40b321ebb932d588934043a2639" PRIMARY KEY ("usuario_id", "rol_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_29e9a9079c7ba01c1b301cf555" ON "usuario_rol" ("usuario_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_ac8911cd54a61461c992654140" ON "usuario_rol" ("rol_id") `);
        await queryRunner.query(`ALTER TABLE "reportes" ADD CONSTRAINT "FK_0133a02f6c44ee667565d9e2170" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "gastos" ADD CONSTRAINT "FK_03b9b6f9ce55fecf2d88be7d82c" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "gastos" ADD CONSTRAINT "FK_1b6ad7767fe4cb8765e3041902d" FOREIGN KEY ("sucursalId") REFERENCES "sucursales"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ingresos_diarios" ADD CONSTRAINT "FK_be8ef49a75689608a37645cbd4b" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ingresos_diarios" ADD CONSTRAINT "FK_494d86898f60bdc5ef91e951721" FOREIGN KEY ("sucursalId") REFERENCES "sucursales"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "productos" ADD CONSTRAINT "FK_aee00189e42dd8880cdfe1bb1e7" FOREIGN KEY ("categoriaId") REFERENCES "categorias"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "stock" ADD CONSTRAINT "FK_579a0fda424b09557f1160d942f" FOREIGN KEY ("productoId") REFERENCES "productos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "usuario_rol" ADD CONSTRAINT "FK_29e9a9079c7ba01c1b301cf5555" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "usuario_rol" ADD CONSTRAINT "FK_ac8911cd54a61461c9926541401" FOREIGN KEY ("rol_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuario_rol" DROP CONSTRAINT "FK_ac8911cd54a61461c9926541401"`);
        await queryRunner.query(`ALTER TABLE "usuario_rol" DROP CONSTRAINT "FK_29e9a9079c7ba01c1b301cf5555"`);
        await queryRunner.query(`ALTER TABLE "stock" DROP CONSTRAINT "FK_579a0fda424b09557f1160d942f"`);
        await queryRunner.query(`ALTER TABLE "productos" DROP CONSTRAINT "FK_aee00189e42dd8880cdfe1bb1e7"`);
        await queryRunner.query(`ALTER TABLE "ingresos_diarios" DROP CONSTRAINT "FK_494d86898f60bdc5ef91e951721"`);
        await queryRunner.query(`ALTER TABLE "ingresos_diarios" DROP CONSTRAINT "FK_be8ef49a75689608a37645cbd4b"`);
        await queryRunner.query(`ALTER TABLE "gastos" DROP CONSTRAINT "FK_1b6ad7767fe4cb8765e3041902d"`);
        await queryRunner.query(`ALTER TABLE "gastos" DROP CONSTRAINT "FK_03b9b6f9ce55fecf2d88be7d82c"`);
        await queryRunner.query(`ALTER TABLE "reportes" DROP CONSTRAINT "FK_0133a02f6c44ee667565d9e2170"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ac8911cd54a61461c992654140"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_29e9a9079c7ba01c1b301cf555"`);
        await queryRunner.query(`DROP TABLE "usuario_rol"`);
        await queryRunner.query(`DROP TABLE "stock"`);
        await queryRunner.query(`DROP TABLE "productos"`);
        await queryRunner.query(`DROP TABLE "categorias"`);
        await queryRunner.query(`DROP TABLE "ingresos_diarios"`);
        await queryRunner.query(`DROP TABLE "usuarios"`);
        await queryRunner.query(`DROP TABLE "gastos"`);
        await queryRunner.query(`DROP TABLE "sucursales"`);
        await queryRunner.query(`DROP TABLE "reportes"`);
        await queryRunner.query(`DROP TABLE "roles"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
