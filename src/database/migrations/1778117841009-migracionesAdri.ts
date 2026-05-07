import { MigrationInterface, QueryRunner } from "typeorm";

export class MigracionesAdri1778117841009 implements MigrationInterface {
    name = 'MigracionesAdri1778117841009'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pagos" DROP CONSTRAINT "FK_4c86df5e03d591485cb8fd20e96"`);
        await queryRunner.query(`ALTER TABLE "detalle_torta" RENAME COLUMN "texto_torta" TO "textoTorta"`);
        await queryRunner.query(`ALTER TABLE "pagos" RENAME COLUMN "venta_id" TO "ventaId"`);
        await queryRunner.query(`CREATE TABLE "detalleVenta" ("id" SERIAL NOT NULL, "ventaId" integer, "productoId" integer, "cantidad" integer NOT NULL, "precioUnitario" numeric(10,2) NOT NULL, "subtotal" numeric(10,2) NOT NULL, CONSTRAINT "PK_739fd01d174ac1a250739ec15a5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ingresosDiarios" ("id" SERIAL NOT NULL, "fecha" TIMESTAMP NOT NULL DEFAULT now(), "total" numeric(10,2) NOT NULL DEFAULT '0', "observaciones" text, "usuarioId" uuid, "sucursalId" integer, CONSTRAINT "PK_21f24ab57dcd2e07e8eb6895a35" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "pedidos" DROP COLUMN "fecha_pedido"`);
        await queryRunner.query(`ALTER TABLE "pedidos" DROP COLUMN "fecha_entrega"`);
        await queryRunner.query(`ALTER TABLE "pedidos" DROP COLUMN "hora_entrega"`);
        await queryRunner.query(`ALTER TABLE "pedidos" DROP COLUMN "cantidad_personas"`);
        await queryRunner.query(`ALTER TABLE "pedidos" DROP COLUMN "lugar_entrega"`);
        await queryRunner.query(`ALTER TABLE "ventas" DROP COLUMN "usuario_id"`);
        await queryRunner.query(`ALTER TABLE "ventas" DROP COLUMN "sucursal_id"`);
        await queryRunner.query(`ALTER TABLE "pedidos" ADD "fechaPedido" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pedidos" ADD "fechaEntrega" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pedidos" ADD "horaEntrega" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pedidos" ADD "cantidadPersonas" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pedidos" ADD "lugarEntrega" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ventas" ADD "usuarioId" uuid`);
        await queryRunner.query(`ALTER TABLE "ventas" ADD "sucursalId" integer`);
        await queryRunner.query(`ALTER TABLE "pedidos" DROP COLUMN "estado"`);
        await queryRunner.query(`ALTER TABLE "pedidos" ADD "estado" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pagos" ALTER COLUMN "monto" TYPE numeric(10,2)`);
        await queryRunner.query(`ALTER TABLE "pagos" ALTER COLUMN "fecha" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "ventas" ALTER COLUMN "fecha" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "ventas" ALTER COLUMN "total" TYPE numeric(10,2)`);
        await queryRunner.query(`ALTER TABLE "usuarios" DROP CONSTRAINT "UQ_b948c9bc89671151c8ab12d409d"`);
        await queryRunner.query(`ALTER TABLE "pagos" ADD CONSTRAINT "FK_f2caa62513831918888a78e291c" FOREIGN KEY ("ventaId") REFERENCES "ventas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ventas" ADD CONSTRAINT "FK_ffe890346eb72924c06ff4df0a7" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ventas" ADD CONSTRAINT "FK_6e12f1cf7759bcc484f9e6ff1ba" FOREIGN KEY ("sucursalId") REFERENCES "sucursales"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "detalleVenta" ADD CONSTRAINT "FK_8db75873d425c6020dfd0993fc1" FOREIGN KEY ("ventaId") REFERENCES "ventas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "detalleVenta" ADD CONSTRAINT "FK_c73661888272a5c3788b0f8437c" FOREIGN KEY ("productoId") REFERENCES "productos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ingresosDiarios" ADD CONSTRAINT "FK_eca121a25d56123dfafad569a2b" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ingresosDiarios" ADD CONSTRAINT "FK_5d4303e7b050624f629147db914" FOREIGN KEY ("sucursalId") REFERENCES "sucursales"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ingresosDiarios" DROP CONSTRAINT "FK_5d4303e7b050624f629147db914"`);
        await queryRunner.query(`ALTER TABLE "ingresosDiarios" DROP CONSTRAINT "FK_eca121a25d56123dfafad569a2b"`);
        await queryRunner.query(`ALTER TABLE "detalleVenta" DROP CONSTRAINT "FK_c73661888272a5c3788b0f8437c"`);
        await queryRunner.query(`ALTER TABLE "detalleVenta" DROP CONSTRAINT "FK_8db75873d425c6020dfd0993fc1"`);
        await queryRunner.query(`ALTER TABLE "ventas" DROP CONSTRAINT "FK_6e12f1cf7759bcc484f9e6ff1ba"`);
        await queryRunner.query(`ALTER TABLE "ventas" DROP CONSTRAINT "FK_ffe890346eb72924c06ff4df0a7"`);
        await queryRunner.query(`ALTER TABLE "pagos" DROP CONSTRAINT "FK_f2caa62513831918888a78e291c"`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD CONSTRAINT "UQ_b948c9bc89671151c8ab12d409d" UNIQUE ("nombreUsuario")`);
        await queryRunner.query(`ALTER TABLE "ventas" ALTER COLUMN "total" TYPE numeric`);
        await queryRunner.query(`ALTER TABLE "ventas" ALTER COLUMN "fecha" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "pagos" ALTER COLUMN "fecha" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "pagos" ALTER COLUMN "monto" TYPE numeric`);
        await queryRunner.query(`ALTER TABLE "pedidos" DROP COLUMN "estado"`);
        await queryRunner.query(`ALTER TABLE "pedidos" ADD "estado" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ventas" DROP COLUMN "sucursalId"`);
        await queryRunner.query(`ALTER TABLE "ventas" DROP COLUMN "usuarioId"`);
        await queryRunner.query(`ALTER TABLE "pedidos" DROP COLUMN "lugarEntrega"`);
        await queryRunner.query(`ALTER TABLE "pedidos" DROP COLUMN "cantidadPersonas"`);
        await queryRunner.query(`ALTER TABLE "pedidos" DROP COLUMN "horaEntrega"`);
        await queryRunner.query(`ALTER TABLE "pedidos" DROP COLUMN "fechaEntrega"`);
        await queryRunner.query(`ALTER TABLE "pedidos" DROP COLUMN "fechaPedido"`);
        await queryRunner.query(`ALTER TABLE "ventas" ADD "sucursal_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ventas" ADD "usuario_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pedidos" ADD "lugar_entrega" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pedidos" ADD "cantidad_personas" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pedidos" ADD "hora_entrega" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pedidos" ADD "fecha_entrega" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pedidos" ADD "fecha_pedido" TIMESTAMP NOT NULL`);
        await queryRunner.query(`DROP TABLE "ingresosDiarios"`);
        await queryRunner.query(`DROP TABLE "detalleVenta"`);
        await queryRunner.query(`ALTER TABLE "pagos" RENAME COLUMN "ventaId" TO "venta_id"`);
        await queryRunner.query(`ALTER TABLE "detalle_torta" RENAME COLUMN "textoTorta" TO "texto_torta"`);
        await queryRunner.query(`ALTER TABLE "pagos" ADD CONSTRAINT "FK_4c86df5e03d591485cb8fd20e96" FOREIGN KEY ("venta_id") REFERENCES "ventas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
