import { Entity } from "./base.class";

export class Cheque extends Entity {

    CustId:number;
    Number:number;
    Amount:number;
    PayId:number;
    Bank:string;
    AccountNo:string;
    Status:number;
    Remark:string;

}