import { MigrationInterface, QueryRunner } from "typeorm";

export class DropAttendanceLinkTable1783289391761 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS "attendance_link"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
