import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Web3Service } from './web3/web3.service';

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
  getLastBlock() {
    return this.web3Service.getLastBlock()
  }

  @Post()
  writeLasBlock() {
    let lastblock
  }
}
