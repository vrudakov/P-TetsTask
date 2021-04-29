import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from '../enities/group.entity';
import { Index } from '../enities/index.entity';
import { GroupDto } from '../dto/group.dto';


@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
    // private indexRepository: Repository<Index>
  ) {}

  findAll(): Promise<Group[]> {
    return this.groupRepository.find({relations: ["indexes"]})
  }
    
   async findOne(id: string)  {
    var group: Group = await this.groupRepository.findOne(id)

    if (this.groupRepository.findOne(id) !== undefined) {
      const res = await this.groupRepository.find({relations: ["indexes"]})
      // написаь функционал чтоб с группой вернуть и все индексы.
    }
    return group
  }

  update(group: Group): Promise<Group> {
    return this.groupRepository.save(group) //  TODO change to create/update
  }

  async remove(id: string): Promise<void> {
    await this.groupRepository.delete(id);
  }
}

