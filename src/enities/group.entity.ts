import { Index } from "src/enities/index.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, JoinColumn} from "typeorm";

@Entity()
export class Group {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    groupId: number;

    @Column()
    name: string;

    @OneToMany(type => Index, index => index.group)
    indexes: Index[];
    
} 