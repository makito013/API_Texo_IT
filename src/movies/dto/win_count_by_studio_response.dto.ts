import { ApiProperty } from '@nestjs/swagger';

export class WinCountByStudioResponse {
  @ApiProperty({ example: 'Studio', description: 'The studio of the movie' })
  studio: string;

  @ApiProperty({ example: 6, description: 'Total of awards' })
  count: number;
}
