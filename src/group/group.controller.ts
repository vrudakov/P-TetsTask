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


    async fillDbFromWeb3(groupId: string){
        const groupDto: GroupDto = await this.web3Service.getGroupById(groupId)
        let group = new Group

        group.id = +groupId
        group.groupId = +groupId
        group.name = groupDto.name
        await this.groupService.update(group) 
        for(var i = 0; i < groupDto.indexes.length; i++) {
            const indexDto: IndexDto = await this.web3Service.getIndexById(i)
            let idx = new Index

            idx.ethPriceInWei = indexDto.ethPriceInWei
            idx.usdPriceInCents = indexDto.usdCapitalization
            idx.usdCapitalization = indexDto.usdCapitalization
            idx.percentageChange = indexDto.percentageChange
            idx.groupId = +groupId
            idx.name = +i
            idx.id = +i + 1
            console.log(i)
            await this.indexService.update(idx)
        }       
    }

    @Get(':groupId')
    async getGroup(@Param('groupId') groupId: string) {      
        if (await this.groupService.findOne(groupId) === undefined){    
            await this.fillDbFromWeb3(groupId)
        }
        return await this.groupService.findOne(groupId)
    }

    

    @Delete(':groupId') 
    async deleteGroup(@Param('groupId') groupId: string): Promise<void> {
        console.log(groupId)
        return this.groupService.remove(groupId)
    }
}
   