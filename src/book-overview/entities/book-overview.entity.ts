import { Book } from './../../books/entities/book.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BookOverview {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  message: string;

  @ManyToOne(() => Book, (book) => book.overviews) //, { onDelete: 'CASCADE' }
  book: Book;
}
