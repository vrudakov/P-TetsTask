import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Index {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  
    @Column()
    ethPriceInWei: string;
  
    @Column()
    usdPriceInCents: number;
  
    @Column()
    usdCapitalization: number;
  
    @Column()
    percentageChange: number;
} 