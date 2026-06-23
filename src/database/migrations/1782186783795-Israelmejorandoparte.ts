import { MigrationInterface, QueryRunner } from "typeorm";

export class Israelmejorandoparte1782186783795 implements MigrationInterface {
    name = 'Israelmejorandoparte1782186783795'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pedidos" ADD "estadoEntrega" integer DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE "pedidos" ADD "estadoPago" integer DEFAULT '1'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pedidos" DROP COLUMN "estadoPago"`);
        await queryRunner.query(`ALTER TABLE "pedidos" DROP COLUMN "estadoEntrega"`);
    }

}
