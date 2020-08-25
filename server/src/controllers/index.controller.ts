import { Request, Response, NextFunction } from 'express'
import { User } from '../entity/photo';
import {createConnection} from "typeorm";
import dbConnection from '../database';

class IndexController {

    constructor() {}

    public index(req: Request, res: Response, next: NextFunction) {


        

        // throw  Error('this is my error')

        // next(new Error('this is a test'))
        // throw new Error('this is a test error')
        // res.send('Hello world')
    }

    public version(req: Request, res: Response, next: NextFunction) {

        res.status(200).send('ININITAL VERSION')
    }
    

    public async test() {
// console.log('DIR NAME', __dirname);
        // createConnection({
        //     type: "mysql",
        //     host: "localhost",
        //     port: 3306,
        //     username: "root",
        //     password: "",
        //     database: "capitalhardware",
        //     entities: [
        //         __dirname + "/../entity/*.ts"
        //     ],
        //     synchronize: true,
        // }).then( async connection =>{

        dbConnection.then( async connection =>{
            let user = new User();
            user.firstName = "Timber";
            user.lastName = "Saw";
            user.age = 25;
            await user.save();

            // let allUsers = await User.find();
            // let firstUser = await User.findOne(1);
            let timber = await User.findOne({ firstName: "Timber", lastName: "Saw" });

            console.log(timber)

        }).catch( e => console.error(e))

        
    }
}

export const indexController = new IndexController()