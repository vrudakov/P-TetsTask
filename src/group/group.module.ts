import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from '../enities/group.entity';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import { Web3Service } from '../web3/web3.service';
import { Web3Module } from 'src/web3/web3.module';
import { Index } from '../enities/index.entity';
import { IndexController } from '../index/index.controller';
import { IndexModule } from '../index/index.module';

@Module({
    imports: [TypeOrmModule.forFeature([Group, Index]), Web3Module, IndexModule],
    controllers: [GroupController],
    providers: [GroupService],
    exports: [TypeOrmModule, GroupService]
})
export class GroupModule {}
