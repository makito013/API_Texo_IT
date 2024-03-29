import { ApiProperty } from '@nestjs/swagger';

export class WinCountByYearResponse {
  @ApiProperty({ example: 1991, description: 'The year of the movie' })
  year: number;

  @ApiProperty({ example: 6, description: 'Total of awards' })
  count: number;
}
