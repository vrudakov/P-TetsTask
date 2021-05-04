import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from '../enities/group.entity';
import { ResponseGroupDto } from '../dto/group.dto';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
  ) {}

  findAll(): Promise<Group[]> {
    return this.groupRepository.find({ relations: ['indexes'] });
  }

  async findOne(id: string) {
    const group = await this.groupRepository.findOne(id);

    if (group !== undefined) {
      const idx: number[] = [];
      const all = await this.groupRepository.find({
        relations: ['indexes'],
        where: { groupId: id },
      });
      const allIndex = all[0].indexes;
      allIndex.forEach((element) => {
        idx.push(element.name);
      });
      const res: ResponseGroupDto = { id: +id, name: group.name, indexes: idx };
      return res;
    }
    return group;
  }

  async update(group: Group): Promise<Group> {
    return await this.groupRepository.save(group); //  TODO change to create/update
  }

  async remove(id: string): Promise<void> {
    await this.groupRepository.delete(id);
  }
}
