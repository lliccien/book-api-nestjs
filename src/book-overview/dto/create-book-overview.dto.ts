import { IsString } from 'class-validator';

export class CreateBookOverviewDto {
  @IsString()
  message: string;

  //   @IsString()
  //   book: string;
}
