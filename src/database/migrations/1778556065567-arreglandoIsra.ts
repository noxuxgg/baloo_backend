import { MigrationInterface, QueryRunner } from "typeorm";

export class ArreglandoIsra1778556065567 implements MigrationInterface {
    name = 'ArreglandoIsra1778556065567'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ventas" ADD "estado" boolean NOT NULL DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ventas" DROP COLUMN "estado"`);
    }

}
