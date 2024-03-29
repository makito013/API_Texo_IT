import { MigrationInterface, QueryRunner } from 'typeorm';

export class moviesStudios1711688296741 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE TABLE "moviesStudios" (
        "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
        "movieId" integer,
        "studioId" integer,
        CONSTRAINT "FK_22eb2d8cbe6686a197bfb863644" FOREIGN KEY ("movieId") REFERENCES "movie" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
        CONSTRAINT "FK_07a749c9d5fbd53337b9618ce56" FOREIGN KEY ("studioId") REFERENCES "studio" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
      );
  `);

    await queryRunner.query(
      `CREATE INDEX "movies_studios_movie_id_IDX" ON "moviesStudios" ("movieId");`,
    );
    await queryRunner.query(
      `CREATE INDEX "movies_studios_studio_id_IDX" ON "moviesStudios" ("studioId");`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX movies_studios_movie_id_IDX;`);
    await queryRunner.query(`DROP INDEX movies_studios_studio_id_IDX;`);
    await queryRunner.query(`DROP TABLE moviesStudios;`);
  }
}
