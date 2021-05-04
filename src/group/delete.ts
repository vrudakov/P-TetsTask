import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from '../enities/group.entity';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
  ) {}

  findAll(): Promise<Group[]> {
    return this.groupRepository.find();
  }

  findOne(id: string): Promise<Group> {
    return this.groupRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.groupRepository.delete(id);
  }
}
