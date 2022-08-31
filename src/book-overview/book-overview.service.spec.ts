import { Test, TestingModule } from '@nestjs/testing';
import { BookOverviewService } from './book-overview.service';

describe('BookOverviewService', () => {
  let service: BookOverviewService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookOverviewService],
    }).compile();

    service = module.get<BookOverviewService>(BookOverviewService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
