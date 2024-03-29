import { ApiProperty } from '@nestjs/swagger';

export class IntervalData {
  @ApiProperty({ example: 6, description: 'Total of awards' })
  producer: string;

  @ApiProperty({ example: 6, description: 'Total of awards' })
  interval: number;

  @ApiProperty({ example: 6, description: 'Total of awards' })
  previousWin: number;

  @ApiProperty({ example: 6, description: 'Total of awards' })
  followingWin: number;
}

export class IntervalAwardResponse {
  @ApiProperty({
    type: IntervalData,
    example: [
      {
        producer: 'producer',
        interval: 1,
        previousWin: 1991,
        followingWin: 1992,
      },
    ],
    description: 'Shortest interval between awards',
  })
  min: IntervalData[];

  @ApiProperty({
    type: IntervalData,
    example: [
      {
        producer: 'producer',
        interval: 6,
        previousWin: 1991,
        followingWin: 1997,
      },
    ],
    description: 'Longest interval between awards',
  })
  max: IntervalData[];
}
