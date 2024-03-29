import { IsNotEmpty } from 'class-validator';

export class AddImportHistoryDto {
  @IsNotEmpty()
  date: Date;

  @IsNotEmpty()
  rows: number;
}
