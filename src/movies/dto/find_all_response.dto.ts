import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';

export class FindAllDto {
  @Expose()
  @ApiProperty({ example: 1, description: 'The id of the movie' })
  id: number;

  @Expose()
  @ApiProperty({ example: 'Title', description: 'The title of the movie' })
  title: string;

  @Expose()
  @ApiProperty({ example: 1991, description: 'The year of the movie' })
  year: number;

  @Expose()
  @ApiProperty({
    example: 'producer',
    description: 'The producer of the movie',
  })
  producer: string;

  @Expose()
  @ApiProperty({ example: true, description: 'The award of the movie' })
  award: boolean;

  @Transform(({ obj }) =>
    obj.movieStudios && obj.movieStudios[0]
      ? obj.movieStudios[0].studio.name
      : null,
  )
  @Expose()
  @ApiProperty({ example: 1, description: 'The id of the movie' })
  studio: string;

  constructor(partial: Partial<FindAllDto>) {
    Object.assign(this, partial);
  }
}

export class FindAllAndCountDto {
  @Expose()
  @ApiProperty({ type: [FindAllDto], description: 'The id of the movie' })
  movies: FindAllDto[];

  @Expose()
  @ApiProperty({ example: 1, description: 'The id of the movie' })
  count: number;
}
