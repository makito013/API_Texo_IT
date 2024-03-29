import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { ImportHistory } from './entities/import_history.entity';
import { AddImportHistoryDto } from './dto/import_history.dto';

@Injectable()
export class ImportHistoryService {
  constructor(
    @InjectRepository(ImportHistory)
    private importHistoryRepository: Repository<ImportHistory>,
  ) {}

  async add(importHistory: AddImportHistoryDto) {
    return await this.importHistoryRepository.insert(importHistory);
  }

  async verifyLatest(date: Date) {
    return await this.importHistoryRepository.find({
      where: {
        date: MoreThanOrEqual(date),
      },
      order: { date: 'DESC' },
    });
  }
}
