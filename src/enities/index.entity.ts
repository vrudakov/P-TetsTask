import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { Group } from "./group.entity";

@Entity()
export class Index {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: number;
  
    @Column()
    ethPriceInWei: number;
  
    @Column()
    usdPriceInCents: number;
  
    @Column()
    usdCapitalization: number;
  
    @Column()
    percentageChange: number;
    
    @Column()
    groupId: number;

    @ManyToOne(type => Group, group => group.indexes)
    public group: Group; 
} 