import { BookOverview } from '../../book-overview/entities/book-overview.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  title: string;

  @Column('text')
  author: string;

  @Column({ length: 4 })
  year: string;

  @OneToMany(() => BookOverview, (BookOverview) => BookOverview.book) // , {
  //   cascade: true,
  //   eager: true,
  // }
  overviews?: BookOverview[];
}
