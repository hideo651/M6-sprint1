import { MigrationInterface, QueryRunner } from "typeorm";

export class isActivateContacts1679576140432 implements MigrationInterface {
    name = 'isActivateContacts1679576140432'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contacts" ADD "isActive" boolean NOT NULL DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contacts" DROP COLUMN "isActive"`);
    }

}
