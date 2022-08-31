import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';

@Injectable()
export class BooksService {
  private readonly logger = new Logger('BookService');

  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  async create(createBookDto: CreateBookDto) {
    try {
      const book = this.bookRepository.create(createBookDto);
      await this.bookRepository.save(book);
      return book;
    } catch (error) {
      this.handleDBExcption(error);
    }
  }

  async findAll() {
    try {
      return await this.bookRepository.find({
        relations: {
          overviews: true,
        },
      });
    } catch (error) {
      this.handleDBExcption(error);
    }
  }

  async findOne(id: string) {
    try {
      return await this.bookRepository.findOneBy({ id });
    } catch (error) {
      this.handleDBExcption(error);
    }
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    const book = await this.bookRepository.preload({
      id,
      ...updateBookDto,
    });

    if (!book) throw new NotFoundException(`Book with id: ${id} not found`);

    try {
      await this.bookRepository.save(book);
      return book;
    } catch (error) {
      this.handleDBExcption(error);
    }
  }

  async remove(id: string) {
    try {
      const book = await this.findOne(id);
      await this.bookRepository.remove(book);
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
