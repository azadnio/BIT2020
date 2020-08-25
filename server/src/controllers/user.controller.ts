import { Request, Response } from 'express'
import pool from '../database'

class UserController {

    constructor() {}

    public index(req: Request, res: Response):void {

        // pool.query('selection asdfasd');
        res.send('selec t* users')
    }

    public create(req: Request, res: Response):void {

        // pool.query('selection asdfasd');
        res.send('create a user')
    }

    public update(req: Request, res: Response):void {

        // pool.query('selection asdfasd');
        res.send('updat a user')
    }

    public delete(req: Request, res: Response):void {

        // pool.query('selection asdfasd');
        res.send('delete a user')
    }

}

export const userController = new UserController()