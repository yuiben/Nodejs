import { MigrationInterface, QueryRunner } from "typeorm";

export class updateBrithday1680097607758 implements MigrationInterface {
    name = 'updateBrithday1680097607758'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_info\` DROP COLUMN \`birthday\``);
        await queryRunner.query(`ALTER TABLE \`user_info\` ADD \`birthday\` date NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_info\` DROP COLUMN \`birthday\``);
        await queryRunner.query(`ALTER TABLE \`user_info\` ADD \`birthday\` varchar(255) NOT NULL`);
    }

}
