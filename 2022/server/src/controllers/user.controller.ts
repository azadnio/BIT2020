import { IRequestExtended } from './../global.interfaces';
import { AppErrNotFound } from './../modals/apperror.class';
import { Request, Response } from 'express'
import { AppErrInvalidRequest } from '../modals/apperror.class';
import { ValidationController } from './validator.controller'
import db from '../database';

class UserController {

    //select or search a system_user
    public async select(req: Request) {

        //select operation on system_user table
        return await db.selectRecords(req, 'system_user');
    }

    public async create(req: IRequestExtended) {

        //create operation on system_user
        return await db.insertSingleRecord(req, 'system_user');
    }

    public async update(req: IRequestExtended) {

        //update system_user
        return await db.updateSingleRecord(req, 'system_user', 'User')
    }

    public async delete(req: IRequestExtended) {

        //delete system_user
        return await db.setStatusDeleted(req, 'system_user', 'User')
    }

}

export const userController = new UserController()