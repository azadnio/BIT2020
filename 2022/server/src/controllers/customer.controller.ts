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
        return await db.selectRecords(req, 'customer');
    }

    public async create(req: IRequestExtended) {

        //create operation on customer
        return await db.insertSingleRecord(req, 'customer');
    }

    public async update(req: IRequestExtended) {

        //update customer
        return await db.updateSingleRecord(req, 'customer', 'Customer')
    }

    public async delete(req: IRequestExtended) {

        //delete customer
        return await db.setStatusDeleted(req, 'customer', 'Customer')
    }
}

export const customerController = new CustomerController()

