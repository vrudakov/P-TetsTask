import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GroupModule } from './group/group.module';
import { IndexModule } from './index/index.module';
import { Web3Module } from './web3/web3.module';
import { LastBlock } from './enities/lastblock.entity';
import { Tx } from './enities/transaction.entity';

@Module({
  imports: [TypeOrmModule.forRoot(),TypeOrmModule.forFeature([LastBlock, Tx]), GroupModule, IndexModule, Web3Module],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {} 