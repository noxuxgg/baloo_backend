import { MigrationInterface, QueryRunner } from "typeorm";

export class MigracionesAdri1777826079802 implements MigrationInterface {
    name = 'MigracionesAdri1777826079802'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stock" ADD "estado" boolean NOT NULL DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stock" DROP COLUMN "estado"`);
    }

}
