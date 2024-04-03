import { Injectable, OnModuleInit } from '@nestjs/common';
import { promisify } from 'util';
import * as fs from 'fs';
import * as csv from 'csv-parser';
import { MoviesService } from '../../movies/movies.service';
import { ImportHistoryService } from '../../shared/shared.service';
import { StudiosService } from '../../studios/studios.service';

const statAsync = promisify(fs.stat);

const path = `${__dirname}/../../../movielist.csv`;
const expectedColumns = ['title', 'year', 'winner', 'producers', 'studios'];

@Injectable()
export class DataImportService implements OnModuleInit {
  constructor(
    private readonly importHistoryService: ImportHistoryService,
    private readonly moviesService: MoviesService,
    private readonly studiosService: StudiosService,
  ) {}

  async onModuleInit() {
    await this.checkFile();
  }

  private async checkFile() {
    try {
      const stats = await statAsync(path);
      const lastModified = stats.mtime;
      const latestImport =
        await this.importHistoryService.verifyLatest(lastModified);

      if (latestImport && latestImport.length) {
        console.log('Spreadsheet has already been imported');
        return;
      }

      await this.importDataFromCsv(lastModified);
    } catch (err) {
      console.error('Erro ao acessar o arquivo:', err);
    }
  }
  private async importDataFromCsv(lastModified: Date): Promise<void> {
    return new Promise((resolve, reject) => {
      const results = [];

      fs.createReadStream(path)
        .pipe(csv({ separator: ';' }))
        .on('data', (data) => {
          const hasAllColumns = expectedColumns.every((column) =>
            Object.hasOwnProperty.call(data, column),
          );
          if (!hasAllColumns) {
            console.error('CSV está faltando uma ou mais colunas necessárias');
            return;
          }
          results.push(data);
        })
        .on('error', reject) // Rejeita a promessa em caso de erro no stream
        .on('end', async () => {
          for (const item of results) {
            if (item.title && item.year && item.producers && item.studios) {
              const movie = {
                title: item.title,
                year: parseInt(item.year, 10),
                award: Boolean(item.winner),
                producers: item.producers
                  .replace(/\bAND\b/gi, ',')
                  .replace(', ,', ',')
                  ?.split(',')
                  .map((prop) => String(prop).toLocaleLowerCase().trim()),
              };
              try {
                const movieBD = await this.moviesService.addMovie(movie);
                await this.studiosService.addStudioToMovie({
                  movie: movieBD,
                  nameStudio: String(item.studios).toLocaleLowerCase(),
                });
              } catch (error) {
                console.error('Erro ao adicionar filme: ', error);
              }
            } else {
              console.error(
                'Item inválido, faltando uma ou mais propriedades necessárias:',
                item,
              );
            }
          }

          this.importHistoryService.add({
            date: lastModified,
            rows: results.length,
          });
          console.log('CSV file successfully processed');
          resolve();
        });
    });
  }
}
