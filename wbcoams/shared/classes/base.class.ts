import { IBaseEntity } from '../interfaces/base_entity.interface';

export abstract class BaseClass implements IBaseEntity {
    id?: number;
    createdAt: Date;
    createdUserId: number;
    updatedAt: Date;
    updatedUserId: number;
    isActive: boolean;

    constructor(entity: IBaseEntity) {
        Object.assign(this, entity);
    }
}