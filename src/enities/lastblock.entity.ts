import { Column, Entity, PrimaryColumn } from 'typeorm';
import { Tx } from './transaction.entity';

@Entity()
export class LastBlock {
  @PrimaryColumn()
  id: number;

  @Column()
  difficulty: string;

  @Column()
  extraData: string;

  @Column()
  gasLimit: number;

  @Column()
  gasUsed: number;

  @Column()
  hash: string;

  @Column('varchar', { length: 1000 })
  logsBloom: string;

  @Column()
  miner: string;

  @Column()
  mixHash: string;

  @Column()
  nonce: string;

  @Column()
  number: number;

  @Column()
  parentHash: string;

  @Column()
  receiptsRoot: string;

  @Column()
  sha3Uncles: string;

  @Column()
  size: number;

  @Column()
  stateRoot: string;

  @Column()
  timestamp: number;

  @Column()
  totalDifficulty: string;

  @Column()
  transactionsRoot: string;

  transactions: Tx[];
}
