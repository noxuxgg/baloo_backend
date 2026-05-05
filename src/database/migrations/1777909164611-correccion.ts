import { MigrationInterface, QueryRunner } from "typeorm";

export class Correccion1777909164611 implements MigrationInterface {
    name = 'Correccion1777909164611'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuarios" DROP CONSTRAINT "UQ_b948c9bc89671151c8ab12d409d"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuarios" ADD CONSTRAINT "UQ_b948c9bc89671151c8ab12d409d" UNIQUE ("nombreUsuario")`);
    }

}
