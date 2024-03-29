import { Entity, Index, PrimaryGeneratedColumn, Column } from 'typeorm';
import { EntityHelper } from '../../common/utils/entity-helper';

@Entity({ name: 'importHistory' })
export class ImportHistory extends EntityHelper {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Index()
  @Column({ name: 'date' })
  date: Date;

  @Index()
  @Column({ name: 'rows' })
  rows: number;
}
