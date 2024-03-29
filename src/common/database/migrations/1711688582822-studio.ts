import { MigrationInterface, QueryRunner } from 'typeorm';

export class Studio1711688582822 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE "studio" (
            "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
            "name" varchar NOT NULL,
            "createdAt" datetime NOT NULL DEFAULT (datetime('now')),
            "updatedAt" datetime NOT NULL DEFAULT (datetime('now')),
            "deleteAt" datetime
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE studio;`);
  }
}
