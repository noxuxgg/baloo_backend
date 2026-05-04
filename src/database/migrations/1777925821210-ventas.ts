import { MigrationInterface, QueryRunner } from "typeorm";

export class Ventas1777925821210 implements MigrationInterface {
    name = 'Ventas1777925821210'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ventas" ("id" SERIAL NOT NULL, "fecha" TIMESTAMP NOT NULL DEFAULT now(), "total" numeric NOT NULL, "sucursalId" integer, "usuarioId" uuid, CONSTRAINT "PK_b8b73abe8561829c019531d9a2e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "pagos" ADD CONSTRAINT "FK_f2caa62513831918888a78e291c" FOREIGN KEY ("ventaId") REFERENCES "ventas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ventas" ADD CONSTRAINT "FK_6e12f1cf7759bcc484f9e6ff1ba" FOREIGN KEY ("sucursalId") REFERENCES "sucursales"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ventas" ADD CONSTRAINT "FK_ffe890346eb72924c06ff4df0a7" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "detalle_venta" ADD CONSTRAINT "FK_8c7cdd27dfaecb574ad82c10ac5" FOREIGN KEY ("ventaId") REFERENCES "ventas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "detalle_venta" DROP CONSTRAINT "FK_8c7cdd27dfaecb574ad82c10ac5"`);
        await queryRunner.query(`ALTER TABLE "ventas" DROP CONSTRAINT "FK_ffe890346eb72924c06ff4df0a7"`);
        await queryRunner.query(`ALTER TABLE "ventas" DROP CONSTRAINT "FK_6e12f1cf7759bcc484f9e6ff1ba"`);
        await queryRunner.query(`ALTER TABLE "pagos" DROP CONSTRAINT "FK_f2caa62513831918888a78e291c"`);
        await queryRunner.query(`DROP TABLE "ventas"`);
    }

}
