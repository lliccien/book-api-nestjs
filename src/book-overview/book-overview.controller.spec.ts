import { Test, TestingModule } from '@nestjs/testing';
import { BookOverviewController } from './book-overview.controller';
import { BookOverviewService } from './book-overview.service';

describe('BookOverviewController', () => {
  let controller: BookOverviewController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookOverviewController],
      providers: [BookOverviewService],
    }).compile();

    controller = module.get<BookOverviewController>(BookOverviewController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
