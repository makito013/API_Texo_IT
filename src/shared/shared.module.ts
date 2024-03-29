import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImportHistory } from './entities/import_history.entity';
import { ImportHistoryService } from './shared.service';

@Module({
  imports: [TypeOrmModule.forFeature([ImportHistory])],
  providers: [ImportHistoryService],
  exports: [ImportHistoryService],
})
export class SharedModule {}
