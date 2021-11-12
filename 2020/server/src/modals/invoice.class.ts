import Base from "./base.class";
// import pool from "../database";
import InvoiceItem from "./invoice-item.class";

class Invoice extends Base {

    date: Date | undefined
    custId: number | undefined
    invoiceItems: InvoiceItem [] = []
    
    constructor(invoice: Invoice) {
        super(invoice)
        this.date = invoice.date
        this.custId = invoice.custId
    }

    async selectAll(){
        
        // let result = await pool.query('select * from invoice')
        // return result
    }

    async create() {

        //insert invoice data
        let data = {
            date: this.date,
            custId: this.custId,
            created: this.created,
            updated: this.updated
        }

        // var result = await pool.query('insert into invoice set ?', data) //WHAT IF THIS FAILD

        //insert invoice items
        this.invoiceItems.forEach(async item => {

            //add the invoice id
            // item.invoiceId = result.insertId

            //insert each items into invoice-items table
            await item.create()
        });

        // return result;
    }

    async update() {

        //update invoice data
        let data = {
            date: this.date,
            custId: this.custId,
            updated: this.updated
        }

        // await pool.query('update invoice set ?', data)

        //delete existing invoice items
        // await pool.query('delete invoice-items where invoiceId ?', this.id)

        //insert invoice items
        this.invoiceItems.forEach(async item => {
            
            //add the invoice id
            item.invoiceId = this.id

            //insert each items into invoice-items table
            await item.create()
        });

        return true;
    }

    async delete() {

        // await pool.query('delete invoice where id = ?', this.id)

        //delete existing invoice items
        // await pool.query('delete invoice-items where invoiceId ?', this.id)

        return true
    }
}

export default Invoice