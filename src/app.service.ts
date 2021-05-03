import { Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LastBlockDto } from './dto/lastblock.dto';
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
  
  async  findLastblock(): Promise<LastBlockDto> {
    var _lastBlock: LastBlock = await this.lastBlockRepository.findOne(1)
    if (_lastBlock === undefined) {
      return undefined
    }
    let xx = await this.txRepository.find()
    let _transactions: string[] = []
    for(let i = 0; i < xx.length; i++) { 
      _transactions.push(xx[i].txnHash)
    }
    await this.txRepository.find()
    var lastBlock: LastBlockDto = {
      difficulty: _lastBlock.difficulty,
      extraData: _lastBlock.extraData,
      gasLimit: _lastBlock.gasLimit,
      gasUsed: _lastBlock.gasUsed,
      hash: _lastBlock.hash,
      logsBloom: _lastBlock.logsBloom,
      miner: _lastBlock.miner, 
      mixHash: _lastBlock.mixHash,
      nonce: _lastBlock.nonce,
      number: _lastBlock.number,
      parentHash: _lastBlock.parentHash,
      receiptsRoot: _lastBlock.receiptsRoot,
      sha3Uncles: _lastBlock.sha3Uncles,
      size: _lastBlock.size,
      stateRoot: _lastBlock.stateRoot,
      timestamp: _lastBlock.timestamp,
      totalDifficulty: _lastBlock.totalDifficulty,
      transactionsRoot: _lastBlock.transactionsRoot,
      transactions: _transactions
    }
    return lastBlock
  }

  async updateLastBlock(lastBlock: LastBlockDto): Promise<void> {
    let currentBlock: LastBlockDto = await this.findLastblock()
    if (currentBlock === undefined || currentBlock.number !== lastBlock.number){
      let currentBlockTx: Tx[] = []
      let txArray = lastBlock.transactions

      await this.removeLastBlock(1)
      await this.removeAllTx(lastBlock.number)
      for(let i = 0; i < lastBlock.transactions.length; i++) {
        currentBlockTx.push({ blockNumber: lastBlock.number, txnHash: String(txArray[i])})
        await this.updateTx({ blockNumber: lastBlock.number, txnHash: String(txArray[i])})
      }
      
      let _lastBlock: LastBlock = {
        id: 1,
        difficulty: lastBlock.difficulty,
        extraData: lastBlock.extraData,
        gasLimit: lastBlock.gasLimit,
        gasUsed: lastBlock.gasUsed,
        hash: lastBlock.hash,
        logsBloom: lastBlock.logsBloom,
        miner: lastBlock.miner, 
        mixHash: lastBlock.mixHash,
        nonce: lastBlock.nonce,
        number: lastBlock.number,
        parentHash: lastBlock.parentHash,
        receiptsRoot: lastBlock.receiptsRoot,
        sha3Uncles: lastBlock.sha3Uncles,
        size: lastBlock.size,
        stateRoot: lastBlock.stateRoot,
        timestamp: lastBlock.timestamp,
        totalDifficulty: lastBlock.totalDifficulty,
        transactionsRoot: lastBlock.transactionsRoot,
        transactions: currentBlockTx
      }
      await this.lastBlockRepository.save(_lastBlock)
    }
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

