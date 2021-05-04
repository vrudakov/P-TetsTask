import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IndexController } from './index.controller';
import { IndexService } from './index.service';
import { Index } from '../enities/index.entity';
import { Web3Module } from '../web3/web3.module';

@Module({
  imports: [
    CacheModule.register(),
    TypeOrmModule.forFeature([Index]),
    Web3Module,
  ],
  controllers: [IndexController],
  providers: [IndexService],
  exports: [TypeOrmModule, IndexService],
})
export class IndexModule {}
