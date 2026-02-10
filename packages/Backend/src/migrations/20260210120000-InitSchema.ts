import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema20260210120000 implements MigrationInterface {
  name = "InitSchema20260210120000";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    await queryRunner.query(
      'CREATE TYPE "user_role_enum" AS ENUM (\'ARTISTS\', \'INSTITUTIONS\')'
    );

    await queryRunner.query(
      'CREATE TABLE "users" ("id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(), "email" varchar NOT NULL UNIQUE, "password" varchar NOT NULL, "role" "user_role_enum" NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now())'
    );

    await queryRunner.query(
      'CREATE TABLE "artists" ("id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(), "name" varchar NOT NULL, "city" varchar NOT NULL, "phone" varchar, "mail" varchar NOT NULL, "category" varchar, "image" varchar, "description" text, "user_id" uuid UNIQUE, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "FK_artists_user" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL)'
    );

    await queryRunner.query(
      'CREATE TABLE "institutions" ("id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(), "city" varchar NOT NULL, "name" varchar NOT NULL, "address" varchar NOT NULL, "phone" varchar, "mail" varchar NOT NULL, "category" varchar, "image" varchar, "description" text, "user_id" uuid UNIQUE, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "FK_institutions_user" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL)'
    );

    await queryRunner.query(
      'CREATE TABLE "comments" ("id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(), "institution_id" uuid NOT NULL, "content" text NOT NULL, "author" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "FK_comments_institution" FOREIGN KEY ("institution_id") REFERENCES "institutions"("id") ON DELETE CASCADE)'
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "comments"');
    await queryRunner.query('DROP TABLE "institutions"');
    await queryRunner.query('DROP TABLE "artists"');
    await queryRunner.query('DROP TABLE "users"');
    await queryRunner.query('DROP TYPE "user_role_enum"');
  }
}
