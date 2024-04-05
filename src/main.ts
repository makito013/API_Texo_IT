import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './common/swagger';
import * as fs from 'fs';
import * as path from 'path';

const pathBD = process.env.DATABASE_PATH;

async function bootstrap() {
  const dbPath = path.join(__dirname, pathBD);

  if (fs.existsSync(dbPath)) {
    fs.unlinkSync(dbPath);
  }

  const app = await NestFactory.create(AppModule);
  app.enableCors();

  setupSwagger(app);
  await app.listen(3000);
}
bootstrap();
