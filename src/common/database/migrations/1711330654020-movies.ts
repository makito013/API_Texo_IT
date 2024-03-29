import { MigrationInterface, QueryRunner } from 'typeorm';

export class Movies1711330654020 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE TABLE movie (
        id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        title VARCHAR NOT NULL,
        studio TEXT NOT NULL,
        award boolean NOT NULL,
        "year" INTEGER NOT NULL,
        createdAt DATETIME NOT NULL DEFAULT (datetime('now')),
        updatedAt DATETIME NOT NULL DEFAULT (datetime('now')),
        deleteAt DATETIME
    )`);

    await queryRunner.query(`CREATE INDEX movie_year_IDX ON movie ("year");`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX movie_year_IDX;`);
    await queryRunner.query(`DROP TABLE movie;`);
  }
}
