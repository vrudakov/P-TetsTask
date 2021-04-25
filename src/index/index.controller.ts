import { Controller, Param, Get } from '@nestjs/common';
import { Web3Service } from '../web3/web3.service';

@Controller('index')
export class IndexController {

    constructor(private readonly web3Service: Web3Service){}

    @Get(':id')
    getIndexById(@Param('id')id: number ){
        return this.web3Service.getIndexById(id)
    }
}
