import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movies } from './entities/movies.entity';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { MoviesStudios } from '../shared/entities/movies_studios.entity';
import { Producers } from '../producers/entities/producers.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Movies, MoviesStudios, Producers])],
  controllers: [MoviesController],
  providers: [MoviesService],
  exports: [MoviesService],
})
export class MoviesModule {}
