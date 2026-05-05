import { MigrationInterface, QueryRunner } from "typeorm";

export class MejoraIsrael1777952306829 implements MigrationInterface {
    name = 'MejoraIsrael1777952306829'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "detalleVenta" ("id" SERIAL NOT NULL, "ventaId" integer, "productoId" integer, "cantidad" integer NOT NULL, "precioUnitario" numeric(10,2) NOT NULL, "subtotal" numeric(10,2) NOT NULL, CONSTRAINT "PK_739fd01d174ac1a250739ec15a5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "pagos" ALTER COLUMN "monto" TYPE numeric(10,2)`);
        await queryRunner.query(`ALTER TABLE "ventas" ALTER COLUMN "total" TYPE numeric(10,2)`);
        await queryRunner.query(`ALTER TABLE "detalleVenta" ADD CONSTRAINT "FK_8db75873d425c6020dfd0993fc1" FOREIGN KEY ("ventaId") REFERENCES "ventas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "detalleVenta" ADD CONSTRAINT "FK_c73661888272a5c3788b0f8437c" FOREIGN KEY ("productoId") REFERENCES "productos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "detalleVenta" DROP CONSTRAINT "FK_c73661888272a5c3788b0f8437c"`);
        await queryRunner.query(`ALTER TABLE "detalleVenta" DROP CONSTRAINT "FK_8db75873d425c6020dfd0993fc1"`);
        await queryRunner.query(`ALTER TABLE "ventas" ALTER COLUMN "total" TYPE numeric`);
        await queryRunner.query(`ALTER TABLE "pagos" ALTER COLUMN "monto" TYPE numeric`);
        await queryRunner.query(`DROP TABLE "detalleVenta"`);
    }

}
