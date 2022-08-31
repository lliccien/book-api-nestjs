import { Book } from './../books/entities/book.entity';
import { BooksModule } from './../books/books.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { BookOverviewService } from './book-overview.service';
import { BookOverviewController } from './book-overview.controller';
import { BookOverview } from './entities/book-overview.entity';
import { BooksService } from '../books/books.service';

@Module({
  controllers: [BookOverviewController],
  providers: [BookOverviewService, BooksService],
  imports: [TypeOrmModule.forFeature([BookOverview, Book]), BooksModule],
})
export class BookOverviewModule {}
