import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThanOrEqual } from 'typeorm';
import { Movies } from './entities/movies.entity';
import { AddMovieDto } from './dto/add_movie.dto';
import {
  IntervalAwardResponse,
  IntervalData,
} from './dto/interval_award_response.dto';
import { plainToInstance } from 'class-transformer';
import { FindAllDto } from './dto/find_all_response.dto';
import { IPaginationOptions } from 'src/common/utils/types/pagination-options';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movies)
    private moviesRepository: Repository<Movies>,
  ) {}

  create(createProfileDto: AddMovieDto) {
    return this.moviesRepository.save(
      this.moviesRepository.create(createProfileDto),
    );
  }

  async findAll({
    year,
    limit,
    page,
    award,
  }: IPaginationOptions & { year?: number; award?: string }) {
    let dynamicYearFilter = 0;

    if (year) {
      if (year < 10) dynamicYearFilter = year * 1000;
      else if (year < 100) dynamicYearFilter = year * 100;
      else if (year < 1000) dynamicYearFilter = year * 10;
    }

    const [movies, count] = await this.moviesRepository.findAndCount({
      where: {
        year: year >= 1000 ? year : MoreThanOrEqual(dynamicYearFilter),
        award:
          award === 'true'
            ? true
            : typeof award === 'string'
              ? false
              : undefined,
      },
      skip: limit * page,
      take: limit,
      relations: ['movieStudios', 'movieStudios.studio'],
    });

    return {
      movies: movies.map((movie) =>
        plainToInstance(FindAllDto, movie, { excludeExtraneousValues: true }),
      ),
      count,
    };
  }

  async findByYear(year: number) {
    const movies = await this.moviesRepository.find({
      where: {
        year,
      },
      relations: ['movieStudios', 'movieStudios.studio'],
    });

    return movies.map((movie) =>
      plainToInstance(FindAllDto, movie, { excludeExtraneousValues: true }),
    );
  }

  async findWinCountByYear() {
    return await this.moviesRepository
      .createQueryBuilder('movie')
      .where('movie.award = 1')
      .select('movie.year', 'year')
      .addSelect('COUNT(*)', 'count')
      .groupBy('movie.year')
      .having('COUNT(*) > 1')
      .orderBy('movie.year', 'ASC')
      .getRawMany();
  }

  async findWinCountByStudio(pagination: IPaginationOptions) {
    return await this.moviesRepository
      .createQueryBuilder('movie')
      .leftJoinAndSelect('movie.movieStudios', 'movieStudios')
      .leftJoinAndSelect('movieStudios.studio', 'studio')
      .where('movie.award = 1')
      .select('studio.name', 'studioName')
      .addSelect('COUNT(*)', 'count')
      .groupBy('studio.name')
      .orderBy('studio.name', 'ASC')
      .offset(pagination.limit * pagination.page)
      .limit(pagination.limit)
      .getRawMany();
  }

  async addMovie(movie: AddMovieDto) {
    const movieToInsert = this.moviesRepository.create(movie);
    await this.moviesRepository.save(movieToInsert);
    return movieToInsert;
  }

  async getMinAndMaxIntervalAward(): Promise<IntervalAwardResponse> {
    const awardedMovies = await this.moviesRepository.find({
      where: {
        award: true,
      },
      order: { producer: 'ASC', year: 'ASC' },
    });

    const producerWins: Record<string, number[]> = {};
    const producerIntervals: Record<string, IntervalData[]> = {};

    awardedMovies.forEach((movie) => {
      if (!producerWins[movie.producer]) {
        producerWins[movie.producer] = [];
      }
      producerWins[movie.producer].push(movie.year);
    });

    Object.entries(producerWins).forEach(([producer, wins]) => {
      if (wins.length > 1) {
        producerIntervals[producer] = [];
        for (let i = 1; i < wins.length; i++) {
          const intervalData: IntervalData = {
            producer,
            interval: wins[i] - wins[i - 1],
            previousWin: wins[i - 1],
            followingWin: wins[i],
          };
          producerIntervals[producer].push(intervalData);
        }
      }
    });

    let minIntervals: IntervalData[] = [];
    let maxIntervals: IntervalData[] = [];
    let minInterval = Number.MAX_SAFE_INTEGER;
    let maxInterval = Number.MIN_SAFE_INTEGER;

    Object.values(producerIntervals).forEach((intervals) => {
      intervals.forEach((intervalData) => {
        if (intervalData.interval < minInterval) {
          minInterval = intervalData.interval;
          minIntervals = [intervalData];
        } else if (intervalData.interval === minInterval) {
          minIntervals.push(intervalData);
        }

        if (intervalData.interval > maxInterval) {
          maxInterval = intervalData.interval;
          maxIntervals = [intervalData];
        } else if (intervalData.interval === maxInterval) {
          maxIntervals.push(intervalData);
        }
      });
    });

    const sortedMinIntervals = minIntervals.sort((a, b) =>
      a.producer.localeCompare(b.producer),
    );
    const sortedMaxIntervals = maxIntervals.sort((a, b) =>
      a.producer.localeCompare(b.producer),
    );

    return {
      min: sortedMinIntervals,
      max: sortedMaxIntervals,
    };
  }
}
