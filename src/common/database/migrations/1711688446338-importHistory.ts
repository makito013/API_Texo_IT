import { MigrationInterface, QueryRunner } from 'typeorm';

export class ImportHistory1711688446338 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE "importHistory" (
          "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
          "date" datetime NOT NULL,
          "rows" integer NOT NULL
        );
      `);

    await queryRunner.query(
      `CREATE INDEX "import_history_date_IDX" ON "importHistory" ("date");`,
    );
    await queryRunner.query(
      `CREATE INDEX "import_history_rows_IDX" ON "importHistory" ("rows");`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX import_history_rows_IDX;`);
    await queryRunner.query(`DROP INDEX import_history_date_IDX;`);
    await queryRunner.query(`DROP TABLE importHistory;`);
  }
}
