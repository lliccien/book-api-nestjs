import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BookOverviewService } from './book-overview.service';
import { CreateBookOverviewDto } from './dto/create-book-overview.dto';
import { UpdateBookOverviewDto } from './dto/update-book-overview.dto';

@Controller('book-overview')
export class BookOverviewController {
  constructor(private readonly bookOverviewService: BookOverviewService) {}

  @Post(':bookId')
  create(
    @Param('bookId') bookId: string,
    @Body() createBookOverviewDto: CreateBookOverviewDto,
  ) {
    return this.bookOverviewService.create(bookId, createBookOverviewDto);
  }

  @Get()
  findAll() {
    return this.bookOverviewService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookOverviewService.findOne(id);
  }

  @Patch(':id/:bookId')
  update(
    @Param('id') id: string,
    @Param('bookId') bookId: string,
    @Body() updateBookOverviewDto: UpdateBookOverviewDto,
  ) {
    return this.bookOverviewService.update(id, bookId, updateBookOverviewDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookOverviewService.remove(id);
  }
}
