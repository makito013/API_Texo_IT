import { IsNotEmpty } from 'class-validator';
import { Movies } from 'src/movies/entities/movies.entity';

export class AddStudiosDto {
  @IsNotEmpty()
  nameStudio: string;

  @IsNotEmpty()
  movie: Movies;
}
