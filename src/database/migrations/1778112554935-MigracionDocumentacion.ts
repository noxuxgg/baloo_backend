import { MigrationInterface, QueryRunner } from "typeorm";

export class MigracionDocumentacion1778112554935 implements MigrationInterface {
    name = 'MigracionDocumentacion1778112554935'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "detalle_torta" RENAME COLUMN "texto_torta" TO "textoTorta"`);
        await queryRunner.query(`ALTER TABLE "pedidos" DROP COLUMN "fecha_pedido"`);
        await queryRunner.query(`ALTER TABLE "pedidos" DROP COLUMN "fecha_entrega"`);
        await queryRunner.query(`ALTER TABLE "pedidos" DROP COLUMN "hora_entrega"`);
        await queryRunner.query(`ALTER TABLE "pedidos" DROP COLUMN "cantidad_personas"`);
        await queryRunner.query(`ALTER TABLE "pedidos" DROP COLUMN "lugar_entrega"`);
        await queryRunner.query(`ALTER TABLE "detalle_venta" DROP COLUMN "precio_unitario"`);
        await queryRunner.query(`ALTER TABLE "stock" DROP COLUMN "stock_minimo"`);
        await queryRunner.query(`ALTER TABLE "stock" DROP COLUMN "sucursal_id"`);
        await queryRunner.query(`ALTER TABLE "pedidos" ADD "fechaPedido" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pedidos" ADD "fechaEntrega" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pedidos" ADD "horaEntrega" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pedidos" ADD "cantidadPersonas" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pedidos" ADD "lugarEntrega" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "categorias" ADD "estado" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "pagos" ADD "ventaId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "detalle_venta" ADD "ventaId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "detalle_venta" ADD "productoId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "detalle_venta" ADD "precioUnitario" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "stock" ADD "stockMinimo" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "stock" ADD "estado" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "stock" ADD "sucursalId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pagos" ALTER COLUMN "fecha" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "stock" DROP CONSTRAINT "FK_579a0fda424b09557f1160d942f"`);
        await queryRunner.query(`ALTER TABLE "stock" ALTER COLUMN "productoId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ventas" ADD CONSTRAINT "FK_3cbcca0e21a79d4b2b2fcb7c273" FOREIGN KEY ("sucursal_id") REFERENCES "sucursales"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "stock" ADD CONSTRAINT "FK_579a0fda424b09557f1160d942f" FOREIGN KEY ("productoId") REFERENCES "productos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "stock" ADD CONSTRAINT "FK_0c436469447b207aa33394efac0" FOREIGN KEY ("sucursalId") REFERENCES "sucursales"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stock" DROP CONSTRAINT "FK_0c436469447b207aa33394efac0"`);
        await queryRunner.query(`ALTER TABLE "stock" DROP CONSTRAINT "FK_579a0fda424b09557f1160d942f"`);
        await queryRunner.query(`ALTER TABLE "ventas" DROP CONSTRAINT "FK_3cbcca0e21a79d4b2b2fcb7c273"`);
        await queryRunner.query(`ALTER TABLE "stock" ALTER COLUMN "productoId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "stock" ADD CONSTRAINT "FK_579a0fda424b09557f1160d942f" FOREIGN KEY ("productoId") REFERENCES "productos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pagos" ALTER COLUMN "fecha" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "stock" DROP COLUMN "sucursalId"`);
        await queryRunner.query(`ALTER TABLE "stock" DROP COLUMN "estado"`);
        await queryRunner.query(`ALTER TABLE "stock" DROP COLUMN "stockMinimo"`);
        await queryRunner.query(`ALTER TABLE "detalle_venta" DROP COLUMN "precioUnitario"`);
        await queryRunner.query(`ALTER TABLE "detalle_venta" DROP COLUMN "productoId"`);
        await queryRunner.query(`ALTER TABLE "detalle_venta" DROP COLUMN "ventaId"`);
        await queryRunner.query(`ALTER TABLE "pagos" DROP COLUMN "ventaId"`);
        await queryRunner.query(`ALTER TABLE "categorias" DROP COLUMN "estado"`);
        await queryRunner.query(`ALTER TABLE "pedidos" DROP COLUMN "lugarEntrega"`);
        await queryRunner.query(`ALTER TABLE "pedidos" DROP COLUMN "cantidadPersonas"`);
        await queryRunner.query(`ALTER TABLE "pedidos" DROP COLUMN "horaEntrega"`);
        await queryRunner.query(`ALTER TABLE "pedidos" DROP COLUMN "fechaEntrega"`);
        await queryRunner.query(`ALTER TABLE "pedidos" DROP COLUMN "fechaPedido"`);
        await queryRunner.query(`ALTER TABLE "stock" ADD "sucursal_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "stock" ADD "stock_minimo" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "detalle_venta" ADD "precio_unitario" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pedidos" ADD "lugar_entrega" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pedidos" ADD "cantidad_personas" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pedidos" ADD "hora_entrega" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pedidos" ADD "fecha_entrega" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pedidos" ADD "fecha_pedido" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "detalle_torta" RENAME COLUMN "textoTorta" TO "texto_torta"`);
    }

}
