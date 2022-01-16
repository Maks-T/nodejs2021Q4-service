import { MigrationInterface, QueryRunner } from 'typeorm';

export class startDB1642273797276 implements MigrationInterface {
  name = 'startDB1642273797276';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "name" DROP DEFAULT`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "login" DROP DEFAULT`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "password" DROP DEFAULT`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "password" SET DEFAULT 'password'`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "login" SET DEFAULT 'login'`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "name" SET DEFAULT 'name'`
    );
  }
}
