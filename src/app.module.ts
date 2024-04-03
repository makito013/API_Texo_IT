import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbdatasource } from './common/database/local.data-source';
import { MoviesModule } from './movies/movies.module';
import { StudiosModule } from './studios/studios.module';
import { DataImportService } from './common/pre_init/import_excel';
import { SharedModule } from './shared/shared.module';
import { ImportHistory } from './shared/entities/import_history.entity';
import { ProducersModule } from './producers/producers.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dbdatasource),
    SharedModule,
    MoviesModule,
    StudiosModule,
    ProducersModule,
    ImportHistory,
  ],
  controllers: [],
  providers: [DataImportService],
})
export class AppModule {}
