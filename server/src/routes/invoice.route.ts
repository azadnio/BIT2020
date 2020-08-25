import RouterClass from "../modals/router.class"
import { invoiceController } from "../controllers/invoice.controller"

 class InvoiceRoutes extends RouterClass{

    constructor() {
        super()
        this.config()
    }

    //configure user related routes
    config(): void {
        
        //user CRUD routes
        this.router
            .get('/', invoiceController.index)
            .post('/', invoiceController.create)
            .put('/', invoiceController.update)
            .delete('/', invoiceController.delete)
    }
}

const invoiceRoutes =  new InvoiceRoutes()
export default invoiceRoutes.router