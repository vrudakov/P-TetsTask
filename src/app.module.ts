import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GroupController } from './group/group.controller';
import { IndexController } from './index/index.controller';
import { GroupService } from './group/group.service';
import { Web3Service } from './web3/web3.service';

@Module({
  imports: [],
  controllers: [AppController, GroupController, IndexController],
  providers: [AppService, GroupService, Web3Service],
})
export class AppModule {}
