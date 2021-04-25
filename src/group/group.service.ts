import { Injectable } from '@nestjs/common';
import { Web3Service } from '../web3/web3.service';

@Injectable()
export class GroupService {
   
    getGroupById(groupId: number){
        return 'Here will be responce from web3 about group ' + groupId
    }
}
