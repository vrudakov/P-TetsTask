import {
  Controller,
  Param,
  Get,
  ClassSerializerInterceptor,
  UseInterceptors,
  CacheInterceptor,
  NotFoundException,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Index } from 'src/enities/index.entity';
import { Web3Service } from '../web3/web3.service';
import { IndexService } from './index.service';

@ApiTags('Index API')
@Controller('index')
@UseInterceptors(ClassSerializerInterceptor)
export class IndexController {
  constructor(
    private readonly web3Service: Web3Service,
    private readonly indexService: IndexService,
  ) {}

  @ApiResponse({
    status: 200,
    description: 'get todo by id',
    type: Index,
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found',
  })
  @UseInterceptors(CacheInterceptor)
  @Get(':id')
  async getIndexById(@Param('id') id: string) {
      let index: Index = await this.indexService.findOne(id);
    if (index !== undefined){
        return index
    } else {
        throw new NotFoundException('Index with id= ' + id + ' not exist. Try to update DB querying group/:id');
    }
  }
}
