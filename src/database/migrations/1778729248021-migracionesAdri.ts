import { MigrationInterface, QueryRunner } from "typeorm";

export class MigracionesAdri1778729248021 implements MigrationInterface {
    name = 'MigracionesAdri1778729248021'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "roles" ("id" SERIAL NOT NULL, "nombre" character varying NOT NULL, "descripcion" character varying NOT NULL, CONSTRAINT "UQ_a5be7aa67e759e347b1c6464e10" UNIQUE ("nombre"), CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "reportes" ("id" SERIAL NOT NULL, "tipo" character varying NOT NULL, "fechaInicio" TIMESTAMP NOT NULL, "fechaFin" TIMESTAMP NOT NULL, "usuarioId" uuid, CONSTRAINT "PK_4204634633cb4099bc06b27a17e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "detalle_torta" ("id" SERIAL NOT NULL, "sabor" character varying NOT NULL, "color" character varying NOT NULL, "textoTorta" character varying NOT NULL, "decoracion" character varying NOT NULL, "forma" character varying NOT NULL, "pedidoId" integer, CONSTRAINT "PK_4dd45663819f1a14ec001479a96" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "clientes" ("id" SERIAL NOT NULL, "nombre" character varying NOT NULL, "apellido" character varying NOT NULL, "telefono" character varying NOT NULL, "estado" boolean NOT NULL, CONSTRAINT "PK_d76bf3571d906e4e86470482c08" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pagos_pedido" ("id" SERIAL NOT NULL, "metodo" character varying NOT NULL, "monto" integer NOT NULL, "fecha" TIMESTAMP NOT NULL, "pedidoId" integer, CONSTRAINT "PK_74ecd9c88460814c341649cdbbb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pedidos" ("id" SERIAL NOT NULL, "fechaPedido" TIMESTAMP NOT NULL, "fechaEntrega" TIMESTAMP NOT NULL, "horaEntrega" character varying NOT NULL, "cantidadPersonas" integer NOT NULL, "estado" boolean NOT NULL, "lugarEntrega" character varying NOT NULL, "total" integer NOT NULL, "adelanto" integer NOT NULL, "saldo" integer NOT NULL, "observaciones" character varying NOT NULL, "clienteId" integer, "usuarioId" uuid, "sucursalId" integer, CONSTRAINT "PK_ebb5680ed29a24efdc586846725" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categorias" ("id" SERIAL NOT NULL, "nombre" character varying NOT NULL, "descripcion" character varying, "estado" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_3886a26251605c571c6b4f861fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pagos" ("id" SERIAL NOT NULL, "ventaId" integer, "metodo" character varying NOT NULL, "monto" numeric(10,2) NOT NULL, "fecha" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_37321ca70a2ed50885dc205beb2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ventas" ("id" SERIAL NOT NULL, "fecha" TIMESTAMP NOT NULL DEFAULT now(), "total" numeric(10,2) NOT NULL, "usuarioId" uuid, "sucursalId" integer, "estado" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_b8b73abe8561829c019531d9a2e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "detalleVenta" ("id" SERIAL NOT NULL, "ventaId" integer, "productoId" integer, "cantidad" integer NOT NULL, "precioUnitario" numeric(10,2) NOT NULL, "subtotal" numeric(10,2) NOT NULL, CONSTRAINT "PK_739fd01d174ac1a250739ec15a5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "productos" ("id" SERIAL NOT NULL, "nombre" character varying NOT NULL, "precio" numeric(10,2) NOT NULL, "estado" boolean NOT NULL DEFAULT true, "categoriaId" integer, CONSTRAINT "PK_04f604609a0949a7f3b43400766" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "stock" ("id" SERIAL NOT NULL, "cantidad" integer NOT NULL, "stockMinimo" integer NOT NULL, "productoId" integer NOT NULL, "estado" boolean NOT NULL DEFAULT true, "sucursalId" integer NOT NULL, CONSTRAINT "PK_092bc1fc7d860426a1dec5aa8e9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sucursales" ("id" SERIAL NOT NULL, "nombre" character varying NOT NULL, "direccion" character varying NOT NULL, "telefono" character varying, "estado" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_30d650c6141b4c307be83e9b0a9" UNIQUE ("nombre"), CONSTRAINT "PK_c2232960c9e458db5b18d35eeba" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ingresosDiarios" ("id" SERIAL NOT NULL, "fecha" TIMESTAMP NOT NULL DEFAULT now(), "total" numeric(10,2) NOT NULL DEFAULT '0', "observaciones" text, "usuarioId" uuid, "sucursalId" integer, CONSTRAINT "PK_21f24ab57dcd2e07e8eb6895a35" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "usuarios" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nombreUsuario" character varying NOT NULL, "contrasenia" character varying NOT NULL, "estado" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_d7281c63c176e152e4c531594a8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "gastos" ("id" SERIAL NOT NULL, "fecha" TIMESTAMP NOT NULL DEFAULT now(), "monto" numeric(10,2) NOT NULL DEFAULT '0', "motivo" text NOT NULL, "personaRecibe" text NOT NULL, "usuarioId" uuid, "sucursalId" integer, CONSTRAINT "PK_2b6965305b864a1ed8e6f6bf586" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "usuarioRol" ("usuarioId" uuid NOT NULL, "rolId" integer NOT NULL, CONSTRAINT "PK_1dc8ce65be4c587ef095c5c40d8" PRIMARY KEY ("usuarioId", "rolId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_8c7f778e9f1ddc844f418466d6" ON "usuarioRol" ("usuarioId") `);
        await queryRunner.query(`CREATE INDEX "IDX_145990737fa3c26ee24db12da6" ON "usuarioRol" ("rolId") `);
        await queryRunner.query(`ALTER TABLE "reportes" ADD CONSTRAINT "FK_0133a02f6c44ee667565d9e2170" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "detalle_torta" ADD CONSTRAINT "FK_6dff8e0f8c3da26af43c9378874" FOREIGN KEY ("pedidoId") REFERENCES "pedidos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pagos_pedido" ADD CONSTRAINT "FK_bdf61951b0dcce7a1f423c4880b" FOREIGN KEY ("pedidoId") REFERENCES "pedidos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pedidos" ADD CONSTRAINT "FK_485346a40b61bb8ae3a98f5400c" FOREIGN KEY ("clienteId") REFERENCES "clientes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pedidos" ADD CONSTRAINT "FK_e60a655127c227b5e063e73165b" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pedidos" ADD CONSTRAINT "FK_aaa493727d8b3723eee84b39e5b" FOREIGN KEY ("sucursalId") REFERENCES "sucursales"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pagos" ADD CONSTRAINT "FK_f2caa62513831918888a78e291c" FOREIGN KEY ("ventaId") REFERENCES "ventas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ventas" ADD CONSTRAINT "FK_ffe890346eb72924c06ff4df0a7" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ventas" ADD CONSTRAINT "FK_6e12f1cf7759bcc484f9e6ff1ba" FOREIGN KEY ("sucursalId") REFERENCES "sucursales"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "detalleVenta" ADD CONSTRAINT "FK_8db75873d425c6020dfd0993fc1" FOREIGN KEY ("ventaId") REFERENCES "ventas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "detalleVenta" ADD CONSTRAINT "FK_c73661888272a5c3788b0f8437c" FOREIGN KEY ("productoId") REFERENCES "productos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "productos" ADD CONSTRAINT "FK_aee00189e42dd8880cdfe1bb1e7" FOREIGN KEY ("categoriaId") REFERENCES "categorias"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "stock" ADD CONSTRAINT "FK_579a0fda424b09557f1160d942f" FOREIGN KEY ("productoId") REFERENCES "productos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "stock" ADD CONSTRAINT "FK_0c436469447b207aa33394efac0" FOREIGN KEY ("sucursalId") REFERENCES "sucursales"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ingresosDiarios" ADD CONSTRAINT "FK_eca121a25d56123dfafad569a2b" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ingresosDiarios" ADD CONSTRAINT "FK_5d4303e7b050624f629147db914" FOREIGN KEY ("sucursalId") REFERENCES "sucursales"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "gastos" ADD CONSTRAINT "FK_03b9b6f9ce55fecf2d88be7d82c" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "gastos" ADD CONSTRAINT "FK_1b6ad7767fe4cb8765e3041902d" FOREIGN KEY ("sucursalId") REFERENCES "sucursales"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "usuarioRol" ADD CONSTRAINT "FK_8c7f778e9f1ddc844f418466d6c" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "usuarioRol" ADD CONSTRAINT "FK_145990737fa3c26ee24db12da66" FOREIGN KEY ("rolId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuarioRol" DROP CONSTRAINT "FK_145990737fa3c26ee24db12da66"`);
        await queryRunner.query(`ALTER TABLE "usuarioRol" DROP CONSTRAINT "FK_8c7f778e9f1ddc844f418466d6c"`);
        await queryRunner.query(`ALTER TABLE "gastos" DROP CONSTRAINT "FK_1b6ad7767fe4cb8765e3041902d"`);
        await queryRunner.query(`ALTER TABLE "gastos" DROP CONSTRAINT "FK_03b9b6f9ce55fecf2d88be7d82c"`);
        await queryRunner.query(`ALTER TABLE "ingresosDiarios" DROP CONSTRAINT "FK_5d4303e7b050624f629147db914"`);
        await queryRunner.query(`ALTER TABLE "ingresosDiarios" DROP CONSTRAINT "FK_eca121a25d56123dfafad569a2b"`);
        await queryRunner.query(`ALTER TABLE "stock" DROP CONSTRAINT "FK_0c436469447b207aa33394efac0"`);
        await queryRunner.query(`ALTER TABLE "stock" DROP CONSTRAINT "FK_579a0fda424b09557f1160d942f"`);
        await queryRunner.query(`ALTER TABLE "productos" DROP CONSTRAINT "FK_aee00189e42dd8880cdfe1bb1e7"`);
        await queryRunner.query(`ALTER TABLE "detalleVenta" DROP CONSTRAINT "FK_c73661888272a5c3788b0f8437c"`);
        await queryRunner.query(`ALTER TABLE "detalleVenta" DROP CONSTRAINT "FK_8db75873d425c6020dfd0993fc1"`);
        await queryRunner.query(`ALTER TABLE "ventas" DROP CONSTRAINT "FK_6e12f1cf7759bcc484f9e6ff1ba"`);
        await queryRunner.query(`ALTER TABLE "ventas" DROP CONSTRAINT "FK_ffe890346eb72924c06ff4df0a7"`);
        await queryRunner.query(`ALTER TABLE "pagos" DROP CONSTRAINT "FK_f2caa62513831918888a78e291c"`);
        await queryRunner.query(`ALTER TABLE "pedidos" DROP CONSTRAINT "FK_aaa493727d8b3723eee84b39e5b"`);
        await queryRunner.query(`ALTER TABLE "pedidos" DROP CONSTRAINT "FK_e60a655127c227b5e063e73165b"`);
        await queryRunner.query(`ALTER TABLE "pedidos" DROP CONSTRAINT "FK_485346a40b61bb8ae3a98f5400c"`);
        await queryRunner.query(`ALTER TABLE "pagos_pedido" DROP CONSTRAINT "FK_bdf61951b0dcce7a1f423c4880b"`);
        await queryRunner.query(`ALTER TABLE "detalle_torta" DROP CONSTRAINT "FK_6dff8e0f8c3da26af43c9378874"`);
        await queryRunner.query(`ALTER TABLE "reportes" DROP CONSTRAINT "FK_0133a02f6c44ee667565d9e2170"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_145990737fa3c26ee24db12da6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8c7f778e9f1ddc844f418466d6"`);
        await queryRunner.query(`DROP TABLE "usuarioRol"`);
        await queryRunner.query(`DROP TABLE "gastos"`);
        await queryRunner.query(`DROP TABLE "usuarios"`);
        await queryRunner.query(`DROP TABLE "ingresosDiarios"`);
        await queryRunner.query(`DROP TABLE "sucursales"`);
        await queryRunner.query(`DROP TABLE "stock"`);
        await queryRunner.query(`DROP TABLE "productos"`);
        await queryRunner.query(`DROP TABLE "detalleVenta"`);
        await queryRunner.query(`DROP TABLE "ventas"`);
        await queryRunner.query(`DROP TABLE "pagos"`);
        await queryRunner.query(`DROP TABLE "categorias"`);
        await queryRunner.query(`DROP TABLE "pedidos"`);
        await queryRunner.query(`DROP TABLE "pagos_pedido"`);
        await queryRunner.query(`DROP TABLE "clientes"`);
        await queryRunner.query(`DROP TABLE "detalle_torta"`);
        await queryRunner.query(`DROP TABLE "reportes"`);
        await queryRunner.query(`DROP TABLE "roles"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
