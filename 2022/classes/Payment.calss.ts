import { Entity } from "./base.class";

export class Payment extends Entity {

    CustId:number;
    Type:number;
    Cash:number;
    Remarks:string;  
}