import { Request, Response } from 'express'
import Invoice from '../modals/invoice.class'
import InvoiceItem from '../modals/invoice-item.class'

class InvoiceController {

    constructor() {}

    public index(req: Request, res: Response):void {

        let invoice = new Invoice(req.body || {})
        let rslt = invoice.selectAll()
        res.status(200).send(rslt)
    }

    public create(req: Request, res: Response):void {

        // sample payload: {
        //     custId: 44,
        //     items:[{ price: 99, itemId: 5 }, { price: 99, itemId: 5 }]
        // }

        let invoice = new Invoice(req.body || {}) 

        //create invoice items
        req.body.items.forEach( (item : any) => {

            invoice.invoiceItems.push( new InvoiceItem(item))
        })

        let rslt = invoice.create()
        res.status(200).send(rslt)
    }

    public update(req: Request, res: Response):void {

        // sample payload: {
        //     custId: 44,
        //     id: 5,
        //     items:[{ price: 99, itemId: 5 }, { price: 99, itemId: 5 }]
        // }
        
        let invoice = new Invoice(req.body || {})

        //create invoice items
        req.body.items.forEach( (item : any) => {

            invoice.invoiceItems.push( new InvoiceItem(item))
        })

        let rslt = invoice.update()
        res.status(200).send(rslt)
    }

    public delete(req: Request, res: Response):void {

        // sample payload: {
        //     id: 5
        // }
        let invoice = new Invoice(req.body || {})
        let rslt = invoice.delete()
        res.status(200).send(rslt)
    }

}

export const invoiceController = new InvoiceController()