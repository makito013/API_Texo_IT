import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityHelper } from '../../common/utils/entity-helper';
import { MoviesStudios } from '../../shared/entities/movies_studios.entity';
import { Studios } from '../../studios/entities/studios.entity';
import { Producers } from '../../producers/entities/producers.entity';

@Entity({ name: 'movie' })
export class Movies extends EntityHelper {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'title' })
  title: string;

  @Index()
  @Column({ name: 'year' })
  year: number;

  @Column({ name: 'award' })
  award: boolean;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleteAt' })
  deleteAt: Date;

  @OneToMany(() => MoviesStudios, (movieStudio) => movieStudio.movie)
  movieStudios: Studios;

  @ManyToMany(() => Producers, (producer) => producer.movies)
  @JoinTable()
  producers: Producers[];
}
