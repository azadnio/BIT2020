import { IRequestExtended } from './../global.interfaces';
import { Status } from '../global.enums';
import { NextFunction, Request, Response } from 'express'
import { Item } from '../../../classes/Item.calss';
import { AppErrDatabaseError, AppErrInvalidRequest, AppErrNotFound } from '../modals/apperror.class';
import { ValidationController } from './validator.controller';
import db from '../database';


class ItemController {

    constructor() { }

    //select or search a item
    public async select(req: Request) {

        //select operation on item table
        return await db.select(req, 'item');
    }

    public async create(req: IRequestExtended) {

        //create operation on item
        return await db.create(req, 'item');
    }

    public async update(req: IRequestExtended) {

        //update item
        return await db.update(req, 'item', 'Item')
    }

    public async delete(req: IRequestExtended) {

        //delete item
        return await db.delete(req, 'item', 'Item')
    }
}

export const itemsController = new ItemController()

