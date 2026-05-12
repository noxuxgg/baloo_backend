import { MigrationInterface, QueryRunner } from "typeorm";

export class Arreglandoisra1778549782179 implements MigrationInterface {
    name = 'Arreglandoisra1778549782179'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pedidos" DROP COLUMN "estado"`);
        await queryRunner.query(`ALTER TABLE "pedidos" ADD "estado" boolean NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pedidos" DROP COLUMN "estado"`);
        await queryRunner.query(`ALTER TABLE "pedidos" ADD "estado" character varying NOT NULL`);
    }

}
