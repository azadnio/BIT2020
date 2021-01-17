
import { InvoiceItem } from './../../../classes/InvoiceItem.calss';

import { AppErrInvalidRequest, AppErrDatabaseError, AppErrNotFound } from './../modals/apperror.class';
import { IRequestExtended, IInsertionDBResults } from './../global.interfaces';
import { Request } from 'express'
import db from '../database';
import { Invoice } from '../../../classes/Invoice.calss';
import { IsInteger } from '../validation.utils';
import { PaymentStatus } from '../global.enums';

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

        let invoice: Invoice = req.body,
            inoviceItems: InvoiceItem[] = invoice.Items;

        //TO DO VALIDATE INVOICE

        delete invoice.Items;
        req.body = invoice;

        try {

            //insert invoice master data           
            let InvoiceInsertRslt = await db.insertSingleRecord<IInsertionDBResults>(req, 'invoice');

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

        let invoice: Invoice = req.body,
            inoviceItems: InvoiceItem[] = invoice.Items;

        //TO DO VALIDATE INVOICE

        delete invoice.Items;
        req.body = invoice;
        let InvoiceId = invoice.Id;

        try {

            //insert invoice master data           
            let InvoiceUpdateRslt = await db.updateSingleRecord<IInsertionDBResults>(req, 'invoice', 'Invoice');

            //insert invoice items
            if (InvoiceUpdateRslt.affectedRows) {

                //delete exsisting invoice items
                await db.delete('invoice_items', { InvoiceId });

                //set invoice id into invoice items
                inoviceItems = inoviceItems.map((inv: InvoiceItem) => ({ ...inv, InvoiceId }));

                //insert current invoice items
                await db.insertBulkData(inoviceItems, 'invoice_items');

                //return the invoice master data inserted result
                return InvoiceUpdateRslt;
            }
            else
                throw new AppErrDatabaseError('Cannot update the invoice!');

        } catch (error) {
            throw error;
        }
    }

    public async updateInvoiceStatus(invoiceId: string | number, status: PaymentStatus | string): Promise<IInsertionDBResults> {

        if (!IsInteger([invoiceId, status]))
            throw new AppErrInvalidRequest();

        //convert to integer
        invoiceId = +invoiceId;
        status = +status;

        try {
            //update the status of invoice
            let result = await db.executeQuery<IInsertionDBResults>('UPDATE invoice SET Status = ? WHERE Id = ?', [status, invoiceId]);
            return result;
        } catch (error) {
            throw error;
        }
    }

    public async delete(Id: string | number) {

        if (!IsInteger(Id))
            throw new AppErrInvalidRequest();

        //convert to number
        Id = +Id;

        try {
            //check is there any any payment paid for this invoice
            let result = await db.executeQuery('SELECT 1 FROM payments WHERE Id = ?', [Id]) as Array<any>;

            //NOT having any payments for this invoice
            if (!result.length) {

                //delete invoice master
                let delResult = <IInsertionDBResults>await db.delete('invoice', { Id })
                //delete invoice items
                await db.delete('invoice_items', { InvoiceId: Id });
                return delResult;
            }
            else
                throw new AppErrInvalidRequest('Invoice has payment records!');

        } catch (error) {
            throw error;
        }
    }

}

export const invoiceController = new InvoiceController()