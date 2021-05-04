import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Group } from './group.entity';

@Entity()
export class Index {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: number;

  @ApiProperty()
  @Column({ type: 'bigint' })
  ethPriceInWei: number;

  @ApiProperty()
  @Column()
  usdPriceInCents: number;

  @ApiProperty()
  @Column()
  usdCapitalization: number;

  @ApiProperty()
  @Column()
  percentageChange: number;

  @ApiProperty()
  @Column()
  groupId: number;

  @ManyToOne(() => Group, (group) => group.indexes)
  public group: Group;
}
