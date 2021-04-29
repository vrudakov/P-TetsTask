import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GroupController } from './group/group.controller';
import { IndexController } from './index/index.controller';
import { Web3Service } from './web3/web3.service';
import { GroupModule } from './group/group.module';
import { IndexModule } from './index/index.module';
import { Web3Module } from './web3/web3.module';
import { GroupService } from './group/group.service';

@Module({
  imports: [TypeOrmModule.forRoot(), GroupModule, IndexModule, Web3Module],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {} 