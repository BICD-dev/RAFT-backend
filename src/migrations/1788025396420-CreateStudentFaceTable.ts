import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateStudentFaceTable1788025396420 implements MigrationInterface {
    name = 'CreateStudentFaceTable1788025396420'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "student_face" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "deletedAt" TIMESTAMP,
                "expiresAt" TIMESTAMP,
                "student_id" uuid NOT NULL,
                "embedding" real array NOT NULL,
                "pictureUrl" character varying NOT NULL,
                "provider" character varying NOT NULL,
                CONSTRAINT "UQ_6a5739626a8c9a630e558bb78d7" UNIQUE ("student_id", "provider"),
                CONSTRAINT "PK_a4b2d940435115a54a6e5f060e5" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "student_face"
            ADD CONSTRAINT "FK_b4e6b99ae43c1b88b72e9b2e116" FOREIGN KEY ("student_id") REFERENCES "student"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "student_face" DROP CONSTRAINT "FK_b4e6b99ae43c1b88b72e9b2e116"
        `);
        await queryRunner.query(`
            DROP TABLE "student_face"
        `);
    }

}
