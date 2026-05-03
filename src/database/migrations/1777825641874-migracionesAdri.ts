import { MigrationInterface, QueryRunner } from "typeorm";

export class MigracionesAdri1777825641874 implements MigrationInterface {
    name = 'MigracionesAdri1777825641874'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categorias" ADD "estado" boolean NOT NULL DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categorias" DROP COLUMN "estado"`);
    }

}
