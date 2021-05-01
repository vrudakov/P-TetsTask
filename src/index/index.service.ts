import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Index } from '../enities/index.entity';



@Injectable()
export class IndexService {
  constructor(
    @InjectRepository(Index)
    private indexRepository: Repository<Index>,
  ) {}

  findAll(): Promise<Index[]> {
    return this.indexRepository.find();
  }

  async findOne(name: string): Promise<Index> {
    return await this.indexRepository.findOne({where: {name: name}});
  }

  async update(index: Index): Promise<Index> {
    console.log(index.groupId + " Index SAVED")
    return await this.indexRepository.save(index)
  }

  async remove(id: string): Promise<void> {
    await this.indexRepository.delete(id);
  }
}