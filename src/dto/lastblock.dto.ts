import { ApiProperty } from '@nestjs/swagger';
export class LastBlockDto {
  @ApiProperty()
  difficulty: string;
  @ApiProperty()
  extraData: string;
  @ApiProperty()
  gasLimit: number;
  @ApiProperty()
  gasUsed: number;
  @ApiProperty()
  hash: string;
  @ApiProperty()
  logsBloom: string;
  @ApiProperty()
  miner: string;
  @ApiProperty()
  mixHash: string;
  @ApiProperty()
  nonce: string;
  @ApiProperty()
  number: number;
  @ApiProperty()
  parentHash: string;
  @ApiProperty()
  receiptsRoot: string;
  @ApiProperty()
  sha3Uncles: string;
  @ApiProperty()
  size: number;
  @ApiProperty()
  stateRoot: string;
  @ApiProperty()
  timestamp: number;
  @ApiProperty()
  totalDifficulty: string;
  @ApiProperty()
  transactions: string[];
  @ApiProperty()
  transactionsRoot: string;
}
