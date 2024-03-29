import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { FindAllAndCountDto } from './dto/find_all_response.dto';
import { WinCountByYearResponse } from './dto/win_count_by_year_response.dto';
import { WinCountByStudioResponse } from './dto/win_count_by_studio_response.dto';
import { IntervalAwardResponse } from './dto/interval_award_response.dto';
import { AddMovieDto } from './dto/add_movie.dto';

@ApiBearerAuth()
@ApiTags('Movies')
@Controller({
  path: 'movies',
  version: '1',
})
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createProfileDto: AddMovieDto) {
    return this.moviesService.create(createProfileDto);
  }
  @Get()
  @ApiOkResponse({
    type: FindAllAndCountDto,
    description: 'Returns a list of movies.',
  })
  @ApiQuery({
    name: 'year',
    required: false,
    type: Number,
    description: 'Filter movies by year',
  })
  @ApiQuery({
    name: 'award',
    required: false,
    type: Boolean,
    description: 'Filter movies have award',
  })
  getAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('year') year?: number,
    @Query('award') award?: string,
  ): Promise<FindAllAndCountDto> {
    return this.moviesService.findAll({
      year,
      award,
      page,
      limit,
    });
  }

  @Get('winCountByYear')
  @ApiOkResponse({
    type: WinCountByYearResponse,
    description: 'Returns the total number of awards received by year',
  })
  getWinCountByYear(): Promise<WinCountByYearResponse[]> {
    return this.moviesService.findWinCountByYear();
  }

  @Get('winCountByStudio')
  @ApiOkResponse({
    type: WinCountByStudioResponse,
    description: 'Returns the total number of awards received by Studio',
  })
  getwinCountByStudio(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<WinCountByStudioResponse[]> {
    return this.moviesService.findWinCountByStudio({ page, limit });
  }

  @Get('interval/minAndMax')
  @ApiOkResponse({
    type: IntervalAwardResponse,
    description: 'Returns the total number of awards received by Studio',
  })
  minAndMaxInterval() {
    return this.moviesService.getMinAndMaxIntervalAward();
  }
}
