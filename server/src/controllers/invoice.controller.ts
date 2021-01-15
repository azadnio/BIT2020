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

        let InvoiceInsertRslt,
            invoice: Invoice = req.body,
            inoviceItems: InvoiceItem[] = invoice.Items;

        //TO DO VALIDATE INVOICE

        delete invoice.Items;
        req.body = invoice;

        try {

            //insert invoice master data           
            InvoiceInsertRslt = <IInsertionDBResults>await db.insertSingleRecord(req, 'invoice');

            //insert invoice items
            if (InvoiceInsertRslt.insertId) {

                //set invoice id into invoice items
                inoviceItems = inoviceItems.map((inv: InvoiceItem) => ({ ...inv, InvoiceId: InvoiceInsertRslt.insertId }));

                //bulk insertion invoice items
                await db.insertBulkData(inoviceItems, 'invoice_items');

                //return the invoice master data inserted result
                return InvoiceInsertRslt;
            }
            else
                throw new AppErrDatabaseError('Cannot insert the invoice!');

        } catch (error) {
            throw error;
        }
    }

    public async update(req: IRequestExtended) {

        //update invoice
        return await db.updateSingleRecord(req, 'invoice', 'Invoice')
    }

    public async delete(req: IRequestExtended) {

        //delete invoice
        return await db.setStatusDeleted(req, 'invoice', 'Invoice')
    }

}

export const invoiceController = new InvoiceController()