import { InvoiceItem } from './../../../classes/InvoiceItem.calss';

import { AppErrInvalidRequest, AppErrDatabaseError, AppErrNotFound } from './../modals/apperror.class';
import { IRequestExtended, IInsertionDBResults } from './../global.interfaces';
import { Request, Response } from 'express'
import db from '../database';
import { Invoice } from '../../../classes/Invoice.calss';
import { Item } from '../../../classes/Item.calss';
import { ValidationController } from './validator.controller';

class InvoiceController {

    constructor() { }

    //select or search a invoice
    public async select(req: Request) {

        //no id
        if (!req.query.id || !req.query.id.toString().trim())
            throw new AppErrInvalidRequest();

        //select from multiple table
        //TO DO ROLLBACK if fails

        let resolve, reject,
            result = new Promise((_res, _rej) => { resolve = _res; reject = _rej; });

        //select invoice master data
        db.pool.query('SELECT * FROM invoice where Id = ?', [req.query.id], (error, invoices) => {

            //catch db error
            if (error)
                return reject(new AppErrDatabaseError(error))
            //inovice not found
            else if (invoices.length)
                return reject(new AppErrNotFound('Inovice Not found!'));

            //merge inovice data
            let invoice = new Invoice();
            invoice = { ...invoice, ...invoices[0] };

            //select inovice items
            db.pool.query(`SELECT * FROM inovice_items WHERE InvoiceId = ${invoice.Id}`, (error, items) => {

                //catch db error
                if (error)
                    return reject(new AppErrDatabaseError(error))

                //merge invoice items
                invoice.Items = items;
                //resolve the promis with invoice
                resolve(invoice);
            })
        });

        return result;
    }

    public async create(req: IRequestExtended) {

        if (!ValidationController.validatePostRequest(req))
            throw new AppErrInvalidRequest();

        let resolve, reject,
            result = new Promise((_res, _rej) => { resolve = _res; reject = _rej; });

        let invoice: Invoice = req.body;
        //TO DO VALIDATE INVOICE

        //seperate invoice items
        let inoviceItems: InvoiceItem[] = invoice.Items;
        delete invoice.Id;
        delete invoice.Items;
        //set updating and creating user
        invoice.UpdatedBy = invoice.CreatedBy = req.decoded.id;

        //insert invoice master data
        db.pool.query('INSERT INTO invoice SET ?', [invoice], (error, InvoiceInsertRslt : IInsertionDBResults) => {

            //catch db error
            if (error)
                return reject(new AppErrDatabaseError(error));
            
            //set invoice id into invoice items
            inoviceItems = inoviceItems.map( (inv: InvoiceItem) => ({ ...inv, InvoiceId : InvoiceInsertRslt.insertId }));

            let sqlParams = [];
            let sql = 'INSERT INTO invoice_items (InvoiceId, ItemId, Price, Quantity) VALUES ';
            let paramsPlaceHolders = [];
            inoviceItems.forEach( (inv: InvoiceItem) => {
                paramsPlaceHolders.push('(?, ?, ?, ?)');
                sqlParams.push(inv.InvoiceId, inv.ItemId, inv.Price, inv.Quantity);
            });
            
            //merge sql params placeholder strings with commas into sql string
            sql += paramsPlaceHolders.join(',')

            //insert inovice items
            db.pool.query(sql, sqlParams, (error, result) => {

                //catch db error
                if (error)
                    return reject(new AppErrDatabaseError(error))

                //resolve the promis with invoice insertion result
                resolve(InvoiceInsertRslt);
            })
        });

        return result;
    }

    public async update(req: IRequestExtended) {

        //update invoice
        return await db.update(req, 'invoice', 'Invoice')
    }

    public async delete(req: IRequestExtended) {

        //delete invoice
        return await db.delete(req, 'invoice', 'Invoice')
    }

}

export const invoiceController = new InvoiceController()