import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityHelper } from '../../common/utils/entity-helper';
import { MoviesStudios } from '../../shared/entities/movies_studios.entity';
import { Studios } from '../../studios/entities/studios.entity';

@Entity({ name: 'movie' })
export class Movies extends EntityHelper {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'title' })
  title: string;

  @Index()
  @Column({ name: 'year' })
  year: number;

  @Column({ name: 'producer' })
  producer: string;

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
}
