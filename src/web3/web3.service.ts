import { Injectable } from '@nestjs/common';
// import Web3 from 'web3'; // Cant resolve ERROR TypeError: web3_1.default is not a constructor 
import fs from 'fs';
const Web3 = require('web3')

@Injectable()
export class Web3Service {
    
    readonly web3: any
    readonly contract: any
    abi: any = '[{\"inputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"constant\":true,\"inputs\":[],\"name\":\"getGroupIds\",\"outputs\":[{\"internalType\":\"uint256[]\",\"name\":\"\",\"type\":\"uint256[]\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"_groupId\",\"type\":\"uint256\"}],\"name\":\"getGroup\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"name\",\"type\":\"string\"},{\"internalType\":\"uint256[]\",\"name\":\"indexes\",\"type\":\"uint256[]\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"_indexId\",\"type\":\"uint256\"}],\"name\":\"getIndex\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"name\",\"type\":\"string\"},{\"internalType\":\"uint256\",\"name\":\"ethPriceInWei\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"usdPriceInCents\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"usdCapitalization\",\"type\":\"uint256\"},{\"internalType\":\"int256\",\"name\":\"percentageChange\",\"type\":\"int256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"}]'
    readonly contractAddres = '0x4f7f1380239450AAD5af611DB3c3c1bb51049c29'


    constructor() {
        
        this.web3 = new Web3('https://ropsten.infura.io/v3/3781457252c74e0fab462d669ed3f9d8')
        this.contract = new this.web3.eth.Contract(JSON.parse(this.abi), this.contractAddres)
        
    }
    
    async getGroupIds(){
        return await this.contract.methods.​getGroupIds().call()
    }

    async getGroupById(id){
        const arrayofIds: number[] = await this.getGroupIds()
        if (arrayofIds.includes(id)){
            await this.contract.methods.​getGroup(id).call().than(console.log)
            return await this.contract.methods.​getGroup(id).call()
        }
        return `Grout with ID - ${id}  not found`
    }
    async getIndexById(id){
        await this.contract.methods.getIndex(id).call().then(console.log)
        return await this.contract.methods.getIndex(id).call()
    }
    
    async getLastBlock(){
        return this.web3.eth.getBlock('latest')
    }
}
