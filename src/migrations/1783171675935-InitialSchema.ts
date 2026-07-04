import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1783171675935 implements MigrationInterface {
    name = 'InitialSchema1783171675935'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "lecturer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "expiresAt" TIMESTAMP, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_1c241d8627c0cead61a0898e518" UNIQUE ("email"), CONSTRAINT "PK_e9647bfd5a4c128c9cc3e8cf99c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "attendance_record" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "expiresAt" TIMESTAMP, "student_id" uuid NOT NULL, "session_id" uuid NOT NULL, "attendance_link_id" uuid, "isPresent" boolean NOT NULL DEFAULT false, "checkedInAt" TIMESTAMP, "confidenceScore" double precision, CONSTRAINT "UQ_1ef2dcfb7667b0b808ad1b8b2f2" UNIQUE ("student_id", "session_id"), CONSTRAINT "PK_c23131acc63826e373019447965" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "student" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "expiresAt" TIMESTAMP, "course_id" uuid NOT NULL, "member_id" character varying NOT NULL, "email" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_34249c33811904ffbff481a8292" UNIQUE ("course_id", "email"), CONSTRAINT "UQ_0f3a6115353f032ca8dd1cad55e" UNIQUE ("course_id", "member_id"), CONSTRAINT "PK_3d8016e1cb58429474a3c041904" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "course" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "expiresAt" TIMESTAMP, "name" character varying NOT NULL, "description" character varying, "lecturer_id" uuid NOT NULL, CONSTRAINT "PK_bf95180dd756fd204fb01ce4916" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "class" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "expiresAt" TIMESTAMP, "course_id" uuid NOT NULL, "start_time" TIMESTAMP NOT NULL, "end_time" TIMESTAMP NOT NULL, "recurring" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_0b9024d21bdfba8b1bd1c300eae" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "class_session" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "expiresAt" TIMESTAMP, "class_id" uuid NOT NULL, "date" TIMESTAMP NOT NULL, "start_time_override" TIMESTAMP, "end_time_override" TIMESTAMP, CONSTRAINT "PK_a3d6e3f59db21b19a3b6eb908d9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "attendance_link" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "expiresAt" TIMESTAMP, "url" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "session_id" uuid NOT NULL, CONSTRAINT "PK_0381ec18fcb2b90cb282d4535a7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "attendance_record" ADD CONSTRAINT "FK_6139dcb587164bcfdc227abe55a" FOREIGN KEY ("session_id") REFERENCES "class_session"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "attendance_record" ADD CONSTRAINT "FK_161004dc810bdbe9e6ba50bde2d" FOREIGN KEY ("student_id") REFERENCES "student"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "attendance_record" ADD CONSTRAINT "FK_b1718ce217105d2bb9203b97a4f" FOREIGN KEY ("attendance_link_id") REFERENCES "attendance_link"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student" ADD CONSTRAINT "FK_140d2607308f60eda2ae0d72a4f" FOREIGN KEY ("course_id") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "course" ADD CONSTRAINT "FK_98079976526883a111a9bd25e48" FOREIGN KEY ("lecturer_id") REFERENCES "lecturer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "class" ADD CONSTRAINT "FK_57476b73061271c061ae6dd16ea" FOREIGN KEY ("course_id") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "class_session" ADD CONSTRAINT "FK_d311babdafa3f4831b808e3643b" FOREIGN KEY ("class_id") REFERENCES "class"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "attendance_link" ADD CONSTRAINT "FK_0fda4b4ae015f0c0121dccf602d" FOREIGN KEY ("session_id") REFERENCES "class_session"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "attendance_link" DROP CONSTRAINT "FK_0fda4b4ae015f0c0121dccf602d"`);
        await queryRunner.query(`ALTER TABLE "class_session" DROP CONSTRAINT "FK_d311babdafa3f4831b808e3643b"`);
        await queryRunner.query(`ALTER TABLE "class" DROP CONSTRAINT "FK_57476b73061271c061ae6dd16ea"`);
        await queryRunner.query(`ALTER TABLE "course" DROP CONSTRAINT "FK_98079976526883a111a9bd25e48"`);
        await queryRunner.query(`ALTER TABLE "student" DROP CONSTRAINT "FK_140d2607308f60eda2ae0d72a4f"`);
        await queryRunner.query(`ALTER TABLE "attendance_record" DROP CONSTRAINT "FK_b1718ce217105d2bb9203b97a4f"`);
        await queryRunner.query(`ALTER TABLE "attendance_record" DROP CONSTRAINT "FK_161004dc810bdbe9e6ba50bde2d"`);
        await queryRunner.query(`ALTER TABLE "attendance_record" DROP CONSTRAINT "FK_6139dcb587164bcfdc227abe55a"`);
        await queryRunner.query(`DROP TABLE "attendance_link"`);
        await queryRunner.query(`DROP TABLE "class_session"`);
        await queryRunner.query(`DROP TABLE "class"`);
        await queryRunner.query(`DROP TABLE "course"`);
        await queryRunner.query(`DROP TABLE "student"`);
        await queryRunner.query(`DROP TABLE "attendance_record"`);
        await queryRunner.query(`DROP TABLE "lecturer"`);
    }

}
