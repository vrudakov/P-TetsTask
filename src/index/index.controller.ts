import {
  Controller,
  Param,
  Get,
  ClassSerializerInterceptor,
  UseInterceptors,
  CacheInterceptor,
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
    return await this.indexService.findOne(id);
  }
}
