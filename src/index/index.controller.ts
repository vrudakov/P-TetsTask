import { Controller, Param, Get, ClassSerializerInterceptor, UseInterceptors, CacheInterceptor } from '@nestjs/common';
import { Web3Service } from '../web3/web3.service';
import { IndexService } from './index.service';

@Controller('index')
@UseInterceptors(ClassSerializerInterceptor)
export class IndexController {

    constructor(private readonly web3Service: Web3Service, private readonly indexService: IndexService){}

    @UseInterceptors(CacheInterceptor)
    @Get(':id')
    async getIndexById(@Param('id')id: string ){
        return await this.indexService.findOne(id)
    }
}
