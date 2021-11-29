import Base from "./base.class"
// import pool from "../database"

class InvoiceItem extends Base {

    invoiceId: number | undefined
    itemId: number | undefined
    price: number |undefined

    constructor(item: InvoiceItem) {
        super(item)
        this.invoiceId = item.invoiceId
        this.price = item.price
    }

    async create() {

        let data = {
            invoiceId: this.invoiceId,
            price: this.price,
            itemId: this.itemId,
            created: this.created,
            updated: this.updated
        }

        // await pool.query('insert into invoice-items set ?', data)

        return true;
    }

    async update() {

        let data = {
            invoiceId: this.invoiceId,
            price: this.price,
            itemId: this.itemId,
            updated: this.updated
        }

        // await pool.query('update invoice-items set ? where id = ? ', [data, this.id])

        return true;
    }

    async delete() {

        // await pool.query('delete invoice-items where id = ?', [this.id])

        return true;
    }

    
}

export default InvoiceItem