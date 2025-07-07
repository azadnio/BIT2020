import { ICategory } from "./category.interface";

export interface IBrand extends ICategory {
    logo?: string; // Optional logo for the brand
}