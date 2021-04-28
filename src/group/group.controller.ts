import { Controller, Delete, Get, NotFoundException, Param } from '@nestjs/common';
import { Web3Service } from '../web3/web3.service';
import { Group } from '../enities/group.entity';
import { GroupService } from './group.service';
import { CreateDto, UpdateDto } from './group.dto';
import { RawIndex } from '../enities/index.entity'


 @Controller('group')
export class GroupController {

    constructor(private readonly web3Service: Web3Service,private readonly groupService: GroupService){}
    
  
    @Get(':groupId')
    async getGroup(@Param('groupId') groupId: string): Promise<Group> {
        const groupDto: CreateDto = await this.web3Service.getGroupById(groupId)
        // console.log(groupDto)
        let group = new Group
        // let indexes = new Index
        // groupDto.indexes.forEach(index => {
            
        // });   
        
        group.id = +groupId
        group.name = groupDto.name
        group.indexes = groupDto.indexes
        console.log(group.indexes)
        this.groupService.update(group)
        return group
    }



    @Delete(':groupId') 
    async deleteGroup(@Param('groupId') groupId: string): Promise<void> {
        console.log(groupId)
        return this.groupService.remove(groupId)
    }
}
   