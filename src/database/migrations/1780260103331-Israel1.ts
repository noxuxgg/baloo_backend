import { MigrationInterface, QueryRunner } from "typeorm";

export class Israel11780260103331 implements MigrationInterface {
    name = 'Israel11780260103331'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clientes" ADD "carnet" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "clientes" ADD "complemento" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clientes" DROP COLUMN "complemento"`);
        await queryRunner.query(`ALTER TABLE "clientes" DROP COLUMN "carnet"`);
    }

}
