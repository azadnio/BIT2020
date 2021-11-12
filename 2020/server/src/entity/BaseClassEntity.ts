import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export abstract class BaseClassEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "datetime", default: 'CURRENT_TIMESTAMP' })
    createAt: Date;

    @Column()
    createdBy: number;

    @Column({ type: "datetime", default: 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    lasteUpdated: Date;

    @Column()
    updatedBy: number;

}
