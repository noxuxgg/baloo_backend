import { MigrationInterface, QueryRunner } from "typeorm";

export class MigracionCorreccion1777655541720 implements MigrationInterface {
    name = 'MigracionCorreccion1777655541720'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "gastos" RENAME COLUMN "persona_recibe" TO "personaRecibe"`);
        await queryRunner.query(`ALTER TABLE "reportes" DROP COLUMN "fecha_inicio"`);
        await queryRunner.query(`ALTER TABLE "reportes" DROP COLUMN "fecha_fin"`);
        await queryRunner.query(`ALTER TABLE "reportes" ADD "fechaInicio" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "reportes" ADD "fechaFin" TIMESTAMP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reportes" DROP COLUMN "fechaFin"`);
        await queryRunner.query(`ALTER TABLE "reportes" DROP COLUMN "fechaInicio"`);
        await queryRunner.query(`ALTER TABLE "reportes" ADD "fecha_fin" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "reportes" ADD "fecha_inicio" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "gastos" RENAME COLUMN "personaRecibe" TO "persona_recibe"`);
    }

}
