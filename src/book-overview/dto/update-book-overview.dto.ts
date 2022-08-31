import { PartialType } from '@nestjs/mapped-types';
import { CreateBookOverviewDto } from './create-book-overview.dto';

export class UpdateBookOverviewDto extends PartialType(CreateBookOverviewDto) {}
