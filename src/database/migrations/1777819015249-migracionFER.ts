import { MigrationInterface, QueryRunner } from "typeorm";

export class MigracionFER1777819015249 implements MigrationInterface {
    name = 'MigracionFER1777819015249'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ingresosDiarios" ("id" SERIAL NOT NULL, "fecha" TIMESTAMP NOT NULL DEFAULT now(), "total" numeric(10,2) NOT NULL DEFAULT '0', "observaciones" text, "usuarioId" uuid, "sucursalId" integer, CONSTRAINT "PK_21f24ab57dcd2e07e8eb6895a35" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "ingresosDiarios" ADD CONSTRAINT "FK_eca121a25d56123dfafad569a2b" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ingresosDiarios" ADD CONSTRAINT "FK_5d4303e7b050624f629147db914" FOREIGN KEY ("sucursalId") REFERENCES "sucursales"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ingresosDiarios" DROP CONSTRAINT "FK_5d4303e7b050624f629147db914"`);
        await queryRunner.query(`ALTER TABLE "ingresosDiarios" DROP CONSTRAINT "FK_eca121a25d56123dfafad569a2b"`);
        await queryRunner.query(`DROP TABLE "ingresosDiarios"`);
    }

}
