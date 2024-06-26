import { IsNotEmpty } from 'class-validator';
import { Movies } from '../../movies/entities/movies.entity';

export class AddStudiosDto {
  @IsNotEmpty()
  nameStudio: string;

  @IsNotEmpty()
  movie: Movies;
}
