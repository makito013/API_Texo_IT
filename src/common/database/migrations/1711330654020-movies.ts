import { MigrationInterface, QueryRunner } from 'typeorm';

export class Movies1711330654020 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE TABLE "movie" (
      "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
      "title" varchar NOT NULL,
      "year" integer NOT NULL,
      "producer" varchar NOT NULL,
      "award" boolean NOT NULL,
      "createdAt" datetime NOT NULL DEFAULT (datetime('now')),
      "updatedAt" datetime NOT NULL DEFAULT (datetime('now')),
      "deleteAt" datetime
    );
    `);

    await queryRunner.query(`CREATE INDEX movie_year_IDX ON movie ("year");`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX movie_year_IDX;`);
    await queryRunner.query(`DROP TABLE movie;`);
  }
}
