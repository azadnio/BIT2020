import { Request } from "express";

export interface IRequestExtended extends Request {
    decoded: any
}

export interface IInsertionDBResults {
    fieldCount: number,
    affectedRows: number,
    insertId: number,
    serverStatus: number,
    warningCount: number,
    message: string,
    protocol41: boolean,
    changedRows: number
}

