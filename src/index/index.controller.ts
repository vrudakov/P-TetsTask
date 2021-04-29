import { Controller, Param, Get } from '@nestjs/common';
import { Web3Service } from '../web3/web3.service';
import { IndexService } from './index.service';

@Controller('index')
export class IndexController {

    constructor(private readonly web3Service: Web3Service, private readonly indexService: IndexService){}

    @Get(':id')
    async getIndexById(@Param('id')id: string ){
        // console.log(await this.web3Service.getIndexById(id))
        return await this.indexService.findOne(id)
    }
}
