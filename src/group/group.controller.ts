import {
  CacheInterceptor,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { Web3Service } from '../web3/web3.service';
import { Group } from '../enities/group.entity';
import { GroupService } from './group.service';
import { GroupDto } from '../dto/group.dto';
import { IndexDto } from '../dto/index.dto';
import { Index } from '../enities/index.entity';
import { IndexService } from '../index/index.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Group API')
@Controller('group')
@UseInterceptors(ClassSerializerInterceptor)
export class GroupController {
  constructor(
    private readonly web3Service: Web3Service,
    private readonly groupService: GroupService,
    private readonly indexService: IndexService,
  ) {}

  @ApiResponse({ status: 200, description: 'Get all groups' })
  @UseInterceptors(CacheInterceptor)
  @Get('all')
  allGroups() {
    return this.groupService.findAll();
  }

  async fillDbFromWeb3(groupId: string) {
    const groupDto: GroupDto = await this.web3Service.getGroupById(groupId);
    const group = new Group();

    group.id = +groupId;
    group.groupId = +groupId;
    group.name = groupDto.name;
    await this.groupService.update(group);
    for (let i = 0; i < groupDto.indexes.length; i++) {
      const indexDto: IndexDto = await this.web3Service.getIndexById(i);
      const idx = new Index();

      idx.ethPriceInWei = indexDto.ethPriceInWei;
      idx.usdPriceInCents = indexDto.usdCapitalization;
      idx.usdCapitalization = indexDto.usdCapitalization;
      idx.percentageChange = indexDto.percentageChange;
      idx.groupId = +groupId;
      idx.name = +i;
      idx.id = +i + 1;
      await this.indexService.update(idx);
    }
  }

  @ApiResponse({
    status: 200,
    description: 'Get group by id',
    type: Group,
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found'
  })
  @UseInterceptors(CacheInterceptor)
  @Get(':groupId')
  async getGroup(@Param('groupId') groupId: string) {
    if ((await this.groupService.findOne(groupId)) === undefined) {
      await this.fillDbFromWeb3(groupId);
    }
    return this.groupService.findOne(groupId);
  }

  @ApiResponse({
    status: 200,
    description: 'Delete certain group by id',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found'
  })
  @Delete(':groupId')
  async deleteGroup(@Param('groupId') groupId: string): Promise<void> {
    return this.groupService.remove(groupId);
  }
}
