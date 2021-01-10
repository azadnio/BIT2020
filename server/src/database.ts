import { AppErrDatabaseError, AppErrInvalidRequest } from "./modals/apperror.class";
import { Status } from './global.enums';
import { Request } from "express";
import { ValidationController } from "./controllers/validator.controller";
import { Entity } from '../../classes/Base.class';
import { IRequestExtended } from "./global.interfaces";

const mysql = require('mysql');
class Db {

    pool = mysql.createPool({
        connectionLimit: 10,
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'capital',
        port: 3308
    });

    executeQuery(sql: string, params: any[] = []) {

        return new Promise((resolve, reject) => {

            this.pool.query(sql, params, (error, results) => {

                //catch error
                if (error)
                    return reject(new AppErrDatabaseError(error))
                
                resolve(results)
            });
        })
    }

    //common CRRUD operations on tables
    async select(req: Request, tableName: string) {

        //no id
        if (!req.query.id || !req.query.id.toString().trim())
            throw new AppErrInvalidRequest();

        let sql = `SELECT * from ${ tableName } WHERE Id = ?`
            , params = [req.query.id];

        //show only active Items unless it requested by externally
        if (req.query.includeDeleted != '1')
            sql += ' AND Status = ' + Status.active;

        try {
            return await db.executeQuery(sql, params);
        } catch (error) {
            throw error
        }
    }

    public async create(req: IRequestExtended, tableName: string) {

        if (!ValidationController.validatePostRequest(req))
            throw new AppErrInvalidRequest();

        let entity: Entity = req.body;
        //do not include id
        delete entity.Id;
        //set updating and creating user
        entity.UpdatedBy = entity.CreatedBy = req.decoded.id;

        try {

            return await db.executeQuery(`INSERT INTO ${tableName} SET ?`, [entity]);

        } catch (error) {
            throw error;
        }
    }

    public async update(req: IRequestExtended, tableName: string, entityName: string) {

        if (!ValidationController.validatePostRequest(req))
            throw new AppErrInvalidRequest();

        let entity: Entity = req.body;        

        //has id
        if (entity.Id == undefined)
            throw new AppErrInvalidRequest("Invalid " + entityName);

        let id = entity.Id;
        //dont update id, created at, updated at
        delete entity.Id
        delete entity.CreateAt
        delete entity.UpdatedAt

        //set updating user
        entity.UpdatedBy = req.decoded.id;

        if (!Object.entries(entity).length)
            throw new AppErrInvalidRequest();

        try {
            return await db.executeQuery(`UPDATE ${tableName} SET ? WHERE Id = ?`, [entity, id]);
        } catch (error) {
            throw error;
        }
    }

    public async delete(req: IRequestExtended, tableName: string, entityName: string) {

        if (!ValidationController.validatePostRequest(req))
            throw new AppErrInvalidRequest();

        let entity: Entity = req.body;
        entity.UpdatedBy = req.decoded.id;

        //has id
        if (entity.Id == undefined)
            throw new AppErrInvalidRequest("Invalid " + entityName);

        try {
            return await db.executeQuery(`UPDATE ${tableName} SET Status = ${Status.deleted} WHERE Id = ?`, [entity.Id]);            
        } catch (error) {
            throw error
        }
    }
}

const db = new Db();
export default db;