import { TypeOrmModule } from '@nestjs/typeorm';
import { DataImportService } from '../common/pre_init/import_excel';
import { dbdatasource } from '../common/database/local.data-source';
import { SharedModule } from '../shared/shared.module';
import { MoviesModule } from '../movies/movies.module';
import { StudiosModule } from '../studios/studios.module';
import { ImportHistory } from '../shared/entities/import_history.entity';
import { MoviesController } from '../movies/movies.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { ProducersModule } from '../producers/producers.module';
import { moviesList } from './utils/movies_in_json';

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
        ProducersModule,
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
      await dataImportService.onModuleInit();
    });
  });

  it('GET: winCountByYear', async () => {
    const expectedResult = [
      { year: 1986, count: 2 },
      { year: 1990, count: 2 },
      { year: 2015, count: 2 },
    ];
    const movies = await moviesController.getWinCountByYear();
    expect(movies.length).toBe(3);
    movies.map((movie, key) => {
      expect(movie).toEqual(expectedResult[key]);
    });
  });

  it('GET: winCountByStudio', async () => {
    const expectedResult = [
      {
        studioName: '20th century fox',
        count: 4,
      },
      {
        studioName: 'associated film distribution',
        count: 1,
      },
      {
        studioName: 'cannon films',
        count: 1,
      },
    ];
    const movies = await moviesController.getwinCountByStudio(0, 3);
    expect(movies.length).toBe(3);
    movies.map((movie, key) => {
      expect(movie).toEqual(expectedResult[key]);
    });
  });

  it('GET: interval/minAndMax', async () => {
    const expectedResult = {
      min: {
        producer: 'joel silver',
        interval: 1,
        previousWin: 1990,
        followingWin: 1991,
      },

      max: {
        producer: 'matthew vaughn',
        interval: 13,
        previousWin: 2002,
        followingWin: 2015,
      },
    };
    const movies = await moviesController.minAndMaxInterval();
    expect(movies.min[0]).toEqual(expectedResult.min);
    expect(movies.max[0]).toEqual(expectedResult.max);
  });

  it('GET: movies', async () => {
    await dataImportService.onModuleInit();

    const movies = await moviesController.getAll(0, 1000);

    moviesList.map((movie) => {
      try {
        const movieToCompare = movies.movies.find(
          (m) => m.title === movie.title,
        );
        expect(movieToCompare).toHaveProperty('title');
        expect(movieToCompare.award).toBe(!!movieToCompare.award);
        expect(movieToCompare.studio).toBe(movieToCompare.studio);
        expect(movieToCompare.title.toLocaleLowerCase()).toBe(
          movie.title.toLocaleLowerCase(),
        );
        expect(movieToCompare.year).toBe(movie.year);
        movieToCompare.producers.map((p) => {
          expect(movie.producers.indexOf(p) !== -1).toBe(true);
        });
      } catch (e) {
        throw new Error(`Movie ${movie.title} not found`);
      }
    });
  });
});
