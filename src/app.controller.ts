import {
  CacheInterceptor,
  ClassSerializerInterceptor,
  Controller,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Web3Service } from './web3/web3.service';
import { LastBlockDto } from './dto/lastblock.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly web3Service: Web3Service,
  ) {}

  @Get()
  greeting(): string {
    return this.appService.greeting();
  }

  @ApiTags('Group API')
  @UseInterceptors(CacheInterceptor)
  @Get('group-ids')
  getGroupIds() {
    return this.web3Service.getGroupIds();
  }


  @ApiTags('Last block API')
  @ApiResponse({
    status: 200,
    description: 'update todo',
    type: LastBlockDto,
  })
  @UseInterceptors(CacheInterceptor)
  @Get('last-block')
  async getLastBlock() {
    await this.saveLastBlock();
    return await this.appService.findLastblock();
  }

  async saveLastBlock(): Promise<void> {
    const lastblock: LastBlockDto = await this.web3Service.getLastBlock();
    try {
      await this.appService.updateLastBlock(lastblock);
    } catch (error) {
      console.log(error);
    }
  }
}
