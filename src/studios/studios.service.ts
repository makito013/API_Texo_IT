import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Studios } from './entities/studios.entity';
import { AddStudiosDto } from './dto/add_studios.dto';
import { MoviesStudios } from '../shared/entities/movies_studios.entity';

@Injectable()
export class StudiosService {
  constructor(
    @InjectRepository(Studios)
    private studiosRepository: Repository<Studios>,

    @InjectRepository(MoviesStudios)
    private moviesStudioRepository: Repository<MoviesStudios>,
  ) {}

  async addStudioToMovie(studio: AddStudiosDto) {
    let studiosFomBD = await this.studiosRepository.findOne({
      where: {
        name: studio.nameStudio,
      },
    });

    if (!studiosFomBD) {
      studiosFomBD = this.studiosRepository.create({
        name: studio.nameStudio,
      });
      await this.studiosRepository.save(studiosFomBD);
    }

    await this.moviesStudioRepository.insert({
      movie: studio.movie,
      studio: studiosFomBD,
    });
  }
}
