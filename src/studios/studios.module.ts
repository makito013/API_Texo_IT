import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Studios } from './entities/studios.entity';
import { StudiosController } from './studios.controller';
import { StudiosService } from './studios.service';
import { MoviesStudios } from '../shared/entities/movies_studios.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Studios, MoviesStudios])],
  controllers: [StudiosController],
  providers: [StudiosService],
  exports: [StudiosService],
})
export class StudiosModule {}
