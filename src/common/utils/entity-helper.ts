import { instanceToPlain } from 'class-transformer';
import { BaseEntity } from 'typeorm';

export class EntityHelper extends BaseEntity {
  __entity?: string;

  toJSON() {
    return instanceToPlain(this);
  }
}
