import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { EntityHelper } from '../../common/utils/entity-helper';
import { MoviesStudios } from '../../shared/entities/movies_studios.entity';

@Entity({ name: 'studio' })
export class Studios extends EntityHelper {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'name' })
  name: string;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleteAt' })
  deleteAt: Date;

  @OneToMany(() => MoviesStudios, (moviesProducers) => moviesProducers.studio)
  movieStudios: MoviesStudios[];
}
