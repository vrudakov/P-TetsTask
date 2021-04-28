import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Index } from './model/index.entity';

@Injectable()
export class IndexService {
  constructor(
    @InjectRepository(Index)
    private indexRepository: Repository<Index>,
  ) {}

  findAll(): Promise<Index[]> {
    return this.indexRepository.find();
  }

  findOne(id: string): Promise<Index> {
    return this.indexRepository.findOne(id);
  }

  update(index: Index): Promise<Index> {
    return this.indexRepository.save(index)
  }

  async remove(id: string): Promise<void> {
    await this.indexRepository.delete(id);
  }
}

