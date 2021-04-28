import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class LastBlock {
    @PrimaryGeneratedColumn()
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

    @Column()
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
    transactions: string;

    @Column()
    transactionsRoot: string;

    @Column()
    uncles: string;
} 