import { Entity } from "./base.class";

export class Customer extends Entity {

    Id: number;

    Name: string

    Address: string;

    City: string;

    Telephone: string;

    NIC: string

    Mobile: string;

    CreditLimit: number;

    Password: string;

    Image:string;

    Email: string;

    Status:number;    
}