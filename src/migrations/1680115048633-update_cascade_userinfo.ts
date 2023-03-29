import { MigrationInterface, QueryRunner } from "typeorm";

export class updateCascadeUserinfo1680115048633 implements MigrationInterface {
    name = 'updateCascadeUserinfo1680115048633'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_info\` DROP FOREIGN KEY \`FK_59c55ac40f267d450246040899e\``);
        await queryRunner.query(`ALTER TABLE \`user_info\` ADD CONSTRAINT \`FK_59c55ac40f267d450246040899e\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_info\` DROP FOREIGN KEY \`FK_59c55ac40f267d450246040899e\``);
        await queryRunner.query(`ALTER TABLE \`user_info\` ADD CONSTRAINT \`FK_59c55ac40f267d450246040899e\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
