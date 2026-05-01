import { MigrationInterface, QueryRunner } from "typeorm";

export class MigracionUserFer1777661642506 implements MigrationInterface {
    name = 'MigracionUserFer1777661642506'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuarios" DROP CONSTRAINT "UQ_9f78cfde576fc28f279e2b7a9cb"`);
        await queryRunner.query(`ALTER TABLE "usuarios" DROP COLUMN "username"`);
        await queryRunner.query(`ALTER TABLE "usuarios" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD "nombreUsuario" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD CONSTRAINT "UQ_b948c9bc89671151c8ab12d409d" UNIQUE ("nombreUsuario")`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD "contrasenia" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuarios" DROP COLUMN "contrasenia"`);
        await queryRunner.query(`ALTER TABLE "usuarios" DROP CONSTRAINT "UQ_b948c9bc89671151c8ab12d409d"`);
        await queryRunner.query(`ALTER TABLE "usuarios" DROP COLUMN "nombreUsuario"`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD "password" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD "username" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD CONSTRAINT "UQ_9f78cfde576fc28f279e2b7a9cb" UNIQUE ("username")`);
    }

}
