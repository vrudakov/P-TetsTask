import { Controller, Delete, Get, Param } from '@nestjs/common';
import { Web3Service } from '../web3/web3.service';
import { Group } from '../enities/group.entity';
import { GroupService } from './group.service';
import { GroupDto } from '../dto/group.dto';
import { IndexDto } from '../dto/index.dto';
import { Index } from '../enities/index.entity';
import { IndexService } from '../index/index.service';


 @Controller('group')
export class GroupController {

    constructor(private readonly web3Service: Web3Service,private readonly groupService: GroupService, private readonly indexService: IndexService){}
    
    @Get('all')
    allGroups() {
        return this.groupService.findAll()
    }

    @Get(':groupId')
    async getGroup(@Param('groupId') groupId: string) {
        const groupDto: GroupDto = await this.web3Service.getGroupById(groupId)
        let group = new Group
        let ret = await this.groupService.findOne(groupId)
        console.log(JSON.stringify(ret) )
      
        if (await this.groupService.findOne(groupId) === undefined){        
            
            group.id = +groupId
            group.groupId = +groupId
            group.name = groupDto.name

            groupDto.indexes.forEach(async index => {
                const indexDto: IndexDto = await this.web3Service.getIndexById(index)
                let idx = new Index
                idx.ethPriceInWei = indexDto.ethPriceInWei
                idx.usdPriceInCents = indexDto.usdCapitalization
                idx.usdCapitalization = indexDto.usdCapitalization
                idx.percentageChange = indexDto.percentageChange
                idx.groupId = +groupId
                idx.name = +index
                idx.id = +index + 1
                this.indexService.update(idx)
            });
            await this.groupService.update(group)
        }
        
        return ret
    }

    


    @Delete(':groupId') 
    async deleteGroup(@Param('groupId') groupId: string): Promise<void> {
        console.log(groupId)
        return this.groupService.remove(groupId)
    }
}
   