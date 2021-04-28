import { RawIndex } from "src/enities/index.entity";

export class CreateDto {
    0: string;
    1: number[];
    name: string;
    indexes: RawIndex[];
}

export class UpdateDto {
    0: string;
    1: string[];
    name: string;
    indexes: number[];
} 