import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveAttendanceLinkAddSessionCode1783288614647 implements MigrationInterface {
    name = 'RemoveAttendanceLinkAddSessionCode1783288614647'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "attendance_record" DROP CONSTRAINT "FK_b1718ce217105d2bb9203b97a4f"`);
        await queryRunner.query(`ALTER TABLE "attendance_record" DROP COLUMN "attendance_link_id"`);
        await queryRunner.query(`ALTER TABLE "class_session" ADD "code" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "class_session" ADD CONSTRAINT "UQ_098a236abf47901f878ff8767df" UNIQUE ("code")`);
        await queryRunner.query(`ALTER TABLE "class_session" ADD "isActive" boolean NOT NULL DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "class_session" DROP COLUMN "isActive"`);
        await queryRunner.query(`ALTER TABLE "class_session" DROP CONSTRAINT "UQ_098a236abf47901f878ff8767df"`);
        await queryRunner.query(`ALTER TABLE "class_session" DROP COLUMN "code"`);
        await queryRunner.query(`ALTER TABLE "attendance_record" ADD "attendance_link_id" uuid`);
        await queryRunner.query(`ALTER TABLE "attendance_record" ADD CONSTRAINT "FK_b1718ce217105d2bb9203b97a4f" FOREIGN KEY ("attendance_link_id") REFERENCES "attendance_link"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
