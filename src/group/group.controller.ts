import { Controller, Get, Param } from '@nestjs/common';
import { GroupService } from './group.service';
import { Web3Service } from '../web3/web3.service';

@Controller('group')
export class GroupController {
    constructor(private readonly groupService: GroupService, private readonly web3Service: Web3Service){}
    
  
    @Get(':groupId')
    getGroup(@Param('groupId') groupId: number) {
        return this.web3Service.getGroupById(groupId)
    }
}
