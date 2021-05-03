import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Web3Service } from './web3/web3.service';
import { LastBlockDto } from './dto/lastblock.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly web3Service: Web3Service) {}

  @Get()
  greeting(): string {
    return this.appService.greeting();
  }

  @Get('group-ids')
  getGroupIds() {
    return this.web3Service.getGroupIds()
  }
  
  @Get('last-block')
  async getLastBlock() {
    await this.saveLastBlock()
    return await this.appService.findLastblock()
  }

  @Get('check')
  finLastBlock() {
    return this.appService.findLastblock(); 
  }

  async saveLastBlock(): Promise<void>{
    let lastblock: LastBlockDto = await this.web3Service.getLastBlock()
    try {
      await  this.appService.updateLastBlock(lastblock)
    } catch (error) {
      console.log(error)
    } 
  }
}
