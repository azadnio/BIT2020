import { Status } from '../global.enums';
import { NextFunction, Request, Response } from 'express'
import { Customer } from '../../../classes/Customer.calss';
import { AppErrDatabaseError, AppErrInvalidRequest, AppErrNotFound } from '../modals/apperror.class';
import { ValidationController } from './validator.controller';
import db from '../database';
import { IRequestExtended } from '../global.interfaces';


class CustomerController {

    constructor() { }

    //select or search a customer
    public async select(req: Request) {

        //select operation on item table
        return await db.select(req, 'customer');
    }

    public async create(req: IRequestExtended) {

        //create operation on customer
        return await db.create(req, 'customer');
    }

    public async update(req: IRequestExtended) {

        //update customer
        return await db.update(req, 'customer', 'Customer')
    }

    public async delete(req: IRequestExtended) {

        //delete customer
        return await db.delete(req, 'customer', 'Customer')
    }
}

export const customerController = new CustomerController()

