import { MigrationInterface, QueryRunner } from 'typeorm';

export class Producer1711332475908 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE awards (
            id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            movieId INTEGER NOT NULL,
            createdAt DATETIME NOT NULL DEFAULT (datetime('now')),
            updatedAt DATETIME NOT NULL DEFAULT (datetime('now')),
            deleteAt DATETIME,
            CONSTRAINT "movies_awards_fk" FOREIGN KEY ("movieId") REFERENCES "movie" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE awards;`);
  }
}
