import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Web3Service } from './web3/web3.service';
import { LastBlockDto } from './dto/lastblock.dto';
import { LastBlock } from './enities/lastblock.entity';
import { Tx } from './enities/transaction.entity';
import { getConnection, QueryRunner } from 'typeorm';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly web3Service: Web3Service) {}

  @Get()
  greeting(): string {
    return this.appService.greeting();
  }

  @Get('group-ids')
  getGroupIds() {
    return this.web3Service.getGroupIds()
  }
  
  @Get('last-block')
  getLastBlock() {
    this.saveLastBlock()
    return this.web3Service.getLastBlock()
  }

  async saveTxn(txn: string[], number: number): Promise<void>{
    this.appService.removeAllTx(number)
    for(let tx of txn) {
        let _tx: Tx = {blockNumber: number, txnHash: tx}
        await this.appService.updateTx(_tx)
    }
  }

  async saveLastBlock(): Promise<void>{
    let lastblock: LastBlockDto = await this.web3Service.getLastBlock()
    let lb: LastBlock = {
      id: 1,
      difficulty: lastblock.difficulty,
      extraData: lastblock.extraData,
      gasLimit: lastblock.gasLimit,
      gasUsed: lastblock.gasUsed,
      hash: lastblock.hash,
      logsBloom: lastblock.logsBloom,
      miner: lastblock.miner, 
      mixHash: lastblock.mixHash,
      nonce: lastblock.nonce,
      number: lastblock.number,
      parentHash: lastblock.parentHash,
      receiptsRoot: lastblock.receiptsRoot,
      sha3Uncles: lastblock.sha3Uncles,
      size: lastblock.size,
      stateRoot: lastblock.stateRoot,
      timestamp: lastblock.timestamp,
      totalDifficulty: lastblock.totalDifficulty,
      transactionsRoot: lastblock.transactionsRoot,
      transactions: lastblock.transactions
    }
    await this.saveTxn(lastblock.transactions, lastblock.number);
    try {
      this.appService.updateLastBlock(lb)
    } catch (error) {
      // console.log(error)
    } 
  }
}
