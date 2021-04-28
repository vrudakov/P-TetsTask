import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from '../enities/group.entity';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import { Web3Module } from '../web3/web3.module';

@Module({
    imports: [TypeOrmModule.forFeature([Group]), Web3Module],
    controllers: [GroupController],
    providers: [ GroupService],
    exports: [TypeOrmModule, GroupService]
})
export class GroupModule {}
