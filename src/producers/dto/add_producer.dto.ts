import { IsNotEmpty } from 'class-validator';
import { Movies } from '../../movies/entities/movies.entity';

export class AddProducersDto {
  @IsNotEmpty()
  nameProducer: string;

  @IsNotEmpty()
  movie: Movies;
}
