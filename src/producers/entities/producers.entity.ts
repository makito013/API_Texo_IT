import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToMany,
} from 'typeorm';
import { EntityHelper } from '../../common/utils/entity-helper';
import { Movies } from '../../movies/entities/movies.entity';

@Entity({ name: 'producer' })
export class Producers extends EntityHelper {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'name' })
  name: string;

  @ManyToMany(() => Movies, (movie) => movie.producers)
  movies: Movies[];

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleteAt' })
  deleteAt: Date;
}
