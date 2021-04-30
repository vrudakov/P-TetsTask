import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from '../enities/group.entity';
import { Index } from '../enities/index.entity';
import { GroupDto, responseGroupDto } from '../dto/group.dto';



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
    
    var group = await this.groupRepository.findOne(id)

    if (group !== undefined) {
      let idx: number[] = []
      let all = await this.groupRepository.find({relations: ["indexes"], where: {groupId: id}})
      let allIndex = all[0].indexes
      allIndex.forEach(element => {
        idx.push(element.name)
      });
      var res: responseGroupDto = {id: +id, name: group.name, indexes: idx};
      return res
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

