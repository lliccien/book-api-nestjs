import { IsArray, IsOptional, IsString, Length } from 'class-validator';
import { IsYear } from '../validations/IsYear';

export class CreateBookDto {
  @IsString()
  title: string;

  @IsString()
  author: string;

  @IsString()
  @Length(4, 4)
  @IsYear()
  year: string;

  // @IsString({ each: true })
  // @IsArray()
  // @IsOptional()
  // overviews?: string[];
}
