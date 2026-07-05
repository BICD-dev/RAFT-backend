import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveIsPresentFromAttendanceRecord1783288810795 implements MigrationInterface {
    name = 'RemoveIsPresentFromAttendanceRecord1783288810795'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "attendance_record" DROP COLUMN "isPresent"`);
        await queryRunner.query(`ALTER TABLE "attendance_record" ALTER COLUMN "checkedInAt" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "attendance_record" ALTER COLUMN "checkedInAt" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "attendance_record" ADD "isPresent" boolean NOT NULL DEFAULT false`);
    }

}
