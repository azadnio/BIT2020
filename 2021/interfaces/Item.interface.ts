import { ItemUnit } from "src/app/sub-modules/common/common.enum";
import { IEntity } from "./Entity.interface";

export interface IItem extends IEntity {

    Info?: string;
    Title?: string;
    Description?: string;
    Category?: string;
    Price: number;
    Status?: number;
    Brand?: string;
    Unit?: ItemUnit;
    Images?:string[];
    discount?: string;
    stripedAmount?: string;
}
