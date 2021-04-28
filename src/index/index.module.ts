import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Web3Service } from 'src/web3/web3.service';
import { IndexController } from './index.controller';
import { IndexService } from './index.service';
import { Index } from './model/index.entity'
import { Web3Module } from '../web3/web3.module';

@Module({
    imports: [TypeOrmModule.forFeature([Index]), Web3Module],
    controllers: [IndexController],
    providers: [IndexService],
    exports: [TypeOrmModule, IndexService]
})
export class IndexModule {}
