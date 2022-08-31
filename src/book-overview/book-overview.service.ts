import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookOverviewDto } from './dto/create-book-overview.dto';
import { UpdateBookOverviewDto } from './dto/update-book-overview.dto';
import { BookOverview } from './entities/book-overview.entity';
import { BooksService } from './../books/books.service';

@Injectable()
export class BookOverviewService {
  private readonly logger = new Logger('BookOverviewService');
  constructor(
    @InjectRepository(BookOverview)
    private readonly bookOverviewRepository: Repository<BookOverview>,
    private readonly bookService: BooksService,
  ) {}
  async create(bookId: string, createBookOverviewDto: CreateBookOverviewDto) {
    const book = await this.bookService.findOne(bookId);

    try {
      const overviewDetails = {
        ...createBookOverviewDto,
        book,
      };
      const overview = this.bookOverviewRepository.create(overviewDetails);
      await this.bookOverviewRepository.save(overview);
      return overview;
    } catch (error) {
      this.handleDBExcption(error);
    }
  }

  async findAll() {
    try {
      return await this.bookOverviewRepository.find({
        relations: {
          book: true,
        },
      });
    } catch (error) {
      this.handleDBExcption(error);
    }
  }

  async findOne(id: string) {
    try {
      return await this.bookOverviewRepository.findOneBy({ id });
    } catch (error) {
      this.handleDBExcption(error);
    }
  }

  async update(
    id: string,
    bookId: string,
    updateBookOverviewDto: UpdateBookOverviewDto,
  ) {
    const book = await this.bookService.findOne(bookId);
    const overview = await this.bookOverviewRepository.preload({
      id,
      ...updateBookOverviewDto,
      book,
    });

    if (!overview)
      throw new NotFoundException(`Overview with id: ${id} not found`);

    try {
      await this.bookOverviewRepository.save(overview);
      return overview;
    } catch (error) {
      this.handleDBExcption(error);
    }
  }

  async remove(id: string) {
    try {
      const overview = await this.findOne(id);
      await this.bookOverviewRepository.remove(overview);
    } catch (error) {
      this.handleDBExcption(error);
    }
  }

  private handleDBExcption(error: any) {
    this.logger.error(error.detail);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs.',
    );
  }
}
