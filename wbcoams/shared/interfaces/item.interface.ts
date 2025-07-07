import { IBaseEntity } from './base-entity.interface';
export interface IItem extends IBaseEntity {
    description: string;
    info: string;
    categoryId: number;
    price: number;
    brandId: number;
    unit: string;
    image?: string;
    oldPrice?: number;
}