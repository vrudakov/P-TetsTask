import { Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LastBlock } from './enities/lastblock.entity';
import { Tx } from './enities/transaction.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(LastBlock)
    private lastBlockRepository: Repository<LastBlock>,
    @InjectRepository(Tx)
    private txRepository: Repository<Tx>
  ) {}


  greeting(): string {
    return 'Hello! This is vrudakov\'s test task';
  }
  
  async updateLastBlock(lastBlock: LastBlock): Promise<LastBlock> {
    this.removeLastBlock(1)
    return await this.lastBlockRepository.save(lastBlock)
  }

  async removeAllTx(blockNumber): Promise<void> {
    await this.txRepository.
    createQueryBuilder().
    delete().
    from(Tx).
    where('blockNumber != :number', {number: blockNumber}).
    execute()
  }

  async updateTx(tx: Tx): Promise<Tx>{
    
    return await this.txRepository.save(tx)
  }

  async removeLastBlock(id: number): Promise<void> {
    await this.lastBlockRepository.delete(id);
  }
}

