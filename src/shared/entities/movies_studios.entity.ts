import {
  Entity,
  Index,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { EntityHelper } from '../../common/utils/entity-helper';
import { Movies } from '../../movies/entities/movies.entity';
import { Studios } from '../../studios/entities/studios.entity';

@Entity({ name: 'moviesStudios' })
export class MoviesStudios extends EntityHelper {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Index()
  @ManyToOne(() => Movies, (movie) => movie.movieStudios)
  @JoinColumn({ name: 'movieId' })
  movie: Movies;

  @Index()
  @ManyToOne(() => Studios, (studio) => studio.movieStudios)
  @JoinColumn({ name: 'studioId' })
  studio: Studios;
}
