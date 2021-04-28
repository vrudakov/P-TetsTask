import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GroupController } from './group/group.controller';
import { IndexController } from './index/index.controller';
import { Web3Service } from './web3/web3.service';
import { GroupModule } from './group/group.module';
import { Web3Module } from './web3/web3.module';
import { IndexModule } from './index/index.module';

@Module({
  imports: [TypeOrmModule.forRoot(), GroupModule, Web3Module, IndexModule],
  controllers: [AppController],
  providers: [AppService ]
})
export class AppModule {} 