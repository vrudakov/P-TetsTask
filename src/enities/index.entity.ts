import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Group } from "./group.entity";

@Entity()
export class RawIndex {
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

    @Column()
    groupId: number;

    @ManyToOne(() => Group, (group: Group) => group.name)
    public group: Group; 
} 