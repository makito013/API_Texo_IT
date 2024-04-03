import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AddMovieDto {
  @ApiProperty({ example: 'Movie Title' })
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 1991 })
  @IsNotEmpty()
  year: number;

  @ApiProperty({ example: true })
  @IsNotEmpty()
  award: boolean;

  @ApiProperty({ example: ['produtor1', 'produtor2'] })
  @IsNotEmpty()
  producers: string[];
}
