import { BaseClass } from "./base.class";
import { IUser } from "../interfaces/user.interface";
import { UserRole } from "../enums/user-roles.enum";

export class User extends BaseClass implements IUser {
    name: string;
    email: string;
    telephone?: string;
    address: string;
    address2?: string;
    city: string;
    nic: string;
    mobile: string;
    photo?: string;
    role?: UserRole;
    password?: string;

    constructor(entity: IUser) {
        super(entity);
        // super({
        //     id: entity.id,
        //     createdAt: entity.createdAt,
        //     createdUserId: entity.createdUserId,
        //     updatedAt: entity.updatedAt,
        //     updatedUserId: entity.updatedUserId,
        //     isActive: entity.isActive
        // });
        // Object.assign(this, entity);
    }

    // constructor({
    //     id,
    //     createdAt,
    //     createdUserId,
    //     updatedAt,
    //     updatedUserId,
    //     isActive = true,
    //     email,
    //     password
    // }: IUser) {
    //     super({ id, createdAt, createdUserId, updatedAt, updatedUserId, isActive });
    //     this.email = email;
    //     this.password = password;
    // }
}