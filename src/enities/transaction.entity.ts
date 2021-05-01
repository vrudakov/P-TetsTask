import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tx {
    @PrimaryGeneratedColumn("increment")
    id?: number;
    
    @Column()
    blockNumber: number;

    @Column()
    txnHash: string;

} 