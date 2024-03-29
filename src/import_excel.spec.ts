import { TypeOrmModule } from '@nestjs/typeorm';
import { DataImportService } from './common/pre_init/import_excel';
import { dbdatasource } from './common/database/local.data-source';
import { SharedModule } from './shared/shared.module';
import { MoviesModule } from './movies/movies.module';
import { StudiosModule } from './studios/studios.module';
import { ImportHistory } from './shared/entities/import_history.entity';
import { MoviesController } from './movies/movies.controller';
import { Test, TestingModule } from '@nestjs/testing';

describe('DataImportService and MoviesController', () => {
  let moviesController: MoviesController;
  let dataImportService: DataImportService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(dbdatasource),
        SharedModule,
        MoviesModule,
        StudiosModule,
        ImportHistory,
      ],
      controllers: [],
      providers: [DataImportService],
    }).compile();

    moviesController = app.get<MoviesController>(MoviesController);
    dataImportService = app.get<DataImportService>(DataImportService);
  });

  describe('Initialization', () => {
    it('DataImportService should be defined and properly initialized', async () => {
      await expect(dataImportService.onModuleInit()).resolves.not.toThrow();
    });
  });

  it('should retrieve a paginated list of movies with default parameters', async () => {
    await dataImportService.onModuleInit();
    const movies = await moviesController.getAll(0, 10);
    expect(movies.movies.length).toBe(10);
    expect(movies.count).toBe(206);
  });

  it('should retrieve a list of movies filtered by year and winning status', async () => {
    const movies = await moviesController.getAll(0, 10, 1991, 'true');
    expect(movies.movies.length).toBe(1);
    expect(movies.count).toBe(1);
  });

  it('should retrieve movies from 1980 and match against a list of known titles', async () => {
    const titlesToTest = [
      "Can't Stop the Music",
      'Cruising',
      'The Formula',
      'Friday the 13th',
      'The Nude Bomb',
      'The Jazz Singer',
      'Raise the Titanic',
      'Saturn 3',
      'Windows',
      'Xanadu',
    ];
    const movies = await moviesController.getAll(0, 10, 1980);
    expect(movies.movies.length).toBe(10);

    movies.movies.map((movie) => {
      expect(titlesToTest.indexOf(movie.title) !== -1).toBe(true);
    });
  });
});
