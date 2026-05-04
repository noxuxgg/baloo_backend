import { MigrationInterface, QueryRunner } from "typeorm";

export class Ventas11777926792969 implements MigrationInterface {
    name = 'Ventas11777926792969'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pagos" DROP CONSTRAINT "FK_f2caa62513831918888a78e291c"`);
        await queryRunner.query(`ALTER TABLE "ventas" DROP CONSTRAINT "FK_ffe890346eb72924c06ff4df0a7"`);
        await queryRunner.query(`ALTER TABLE "ventas" DROP CONSTRAINT "FK_6e12f1cf7759bcc484f9e6ff1ba"`);
        await queryRunner.query(`ALTER TABLE "detalle_venta" DROP CONSTRAINT "FK_8c7cdd27dfaecb574ad82c10ac5"`);
        await queryRunner.query(`ALTER TABLE "detalle_venta" DROP CONSTRAINT "FK_78594dc095d33f11673cef98da2"`);
        await queryRunner.query(`ALTER TABLE "ventas" DROP COLUMN "sucursalId"`);
        await queryRunner.query(`ALTER TABLE "ventas" DROP COLUMN "usuarioId"`);
        await queryRunner.query(`ALTER TABLE "pagos" ADD "venta_id" integer`);
        await queryRunner.query(`ALTER TABLE "ventas" ADD "usuario_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ventas" ADD "sucursal_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "detalle_venta" ADD "venta_id" integer`);
        await queryRunner.query(`ALTER TABLE "detalle_venta" ADD "producto_id" integer`);
        await queryRunner.query(`ALTER TABLE "pagos" ALTER COLUMN "ventaId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ventas" ALTER COLUMN "fecha" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "detalle_venta" ALTER COLUMN "ventaId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "detalle_venta" ALTER COLUMN "productoId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "detalle_venta" DROP COLUMN "precioUnitario"`);
        await queryRunner.query(`ALTER TABLE "detalle_venta" ADD "precioUnitario" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "detalle_venta" DROP COLUMN "subtotal"`);
        await queryRunner.query(`ALTER TABLE "detalle_venta" ADD "subtotal" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pagos" ADD CONSTRAINT "FK_4c86df5e03d591485cb8fd20e96" FOREIGN KEY ("venta_id") REFERENCES "ventas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ventas" ADD CONSTRAINT "FK_3cbcca0e21a79d4b2b2fcb7c273" FOREIGN KEY ("sucursal_id") REFERENCES "sucursales"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "detalle_venta" ADD CONSTRAINT "FK_7a19a69d52a6ee8e62f0a1b4103" FOREIGN KEY ("venta_id") REFERENCES "ventas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "detalle_venta" ADD CONSTRAINT "FK_1ec9a5c8b5c638129f1b4b0e3df" FOREIGN KEY ("producto_id") REFERENCES "productos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "detalle_venta" DROP CONSTRAINT "FK_1ec9a5c8b5c638129f1b4b0e3df"`);
        await queryRunner.query(`ALTER TABLE "detalle_venta" DROP CONSTRAINT "FK_7a19a69d52a6ee8e62f0a1b4103"`);
        await queryRunner.query(`ALTER TABLE "ventas" DROP CONSTRAINT "FK_3cbcca0e21a79d4b2b2fcb7c273"`);
        await queryRunner.query(`ALTER TABLE "pagos" DROP CONSTRAINT "FK_4c86df5e03d591485cb8fd20e96"`);
        await queryRunner.query(`ALTER TABLE "detalle_venta" DROP COLUMN "subtotal"`);
        await queryRunner.query(`ALTER TABLE "detalle_venta" ADD "subtotal" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "detalle_venta" DROP COLUMN "precioUnitario"`);
        await queryRunner.query(`ALTER TABLE "detalle_venta" ADD "precioUnitario" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "detalle_venta" ALTER COLUMN "productoId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "detalle_venta" ALTER COLUMN "ventaId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ventas" ALTER COLUMN "fecha" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "pagos" ALTER COLUMN "ventaId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "detalle_venta" DROP COLUMN "producto_id"`);
        await queryRunner.query(`ALTER TABLE "detalle_venta" DROP COLUMN "venta_id"`);
        await queryRunner.query(`ALTER TABLE "ventas" DROP COLUMN "sucursal_id"`);
        await queryRunner.query(`ALTER TABLE "ventas" DROP COLUMN "usuario_id"`);
        await queryRunner.query(`ALTER TABLE "pagos" DROP COLUMN "venta_id"`);
        await queryRunner.query(`ALTER TABLE "ventas" ADD "usuarioId" uuid`);
        await queryRunner.query(`ALTER TABLE "ventas" ADD "sucursalId" integer`);
        await queryRunner.query(`ALTER TABLE "detalle_venta" ADD CONSTRAINT "FK_78594dc095d33f11673cef98da2" FOREIGN KEY ("productoId") REFERENCES "productos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "detalle_venta" ADD CONSTRAINT "FK_8c7cdd27dfaecb574ad82c10ac5" FOREIGN KEY ("ventaId") REFERENCES "ventas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ventas" ADD CONSTRAINT "FK_6e12f1cf7759bcc484f9e6ff1ba" FOREIGN KEY ("sucursalId") REFERENCES "sucursales"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ventas" ADD CONSTRAINT "FK_ffe890346eb72924c06ff4df0a7" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pagos" ADD CONSTRAINT "FK_f2caa62513831918888a78e291c" FOREIGN KEY ("ventaId") REFERENCES "ventas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
