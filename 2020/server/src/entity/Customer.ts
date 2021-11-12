import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { BaseClassEntity } from "./BaseClassEntity";

@Entity()
export class Customer extends BaseClassEntity {

    @Column()
    name: string;

    @Column()
    address: string;

    @Column()
    city: string;

}
