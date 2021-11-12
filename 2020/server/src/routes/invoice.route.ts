import { auth } from './../controllers/auth.controller';
import { IRequestExtended } from './../global.interfaces';
import { UserRole } from './../global.enums';
import { AppErrNotFound } from './../modals/apperror.class';
import { Request, Response, NextFunction } from 'express';
import RouterClass from "./router.class"
import { invoiceController } from "../controllers/invoice.controller"

class InvoiceRoutes extends RouterClass {

      constructor() {
            super()
            this.config()
      }

      //configure user related routes
      config(): void {

            //invoice CRUD routes
            this.router

                  //select invoice
                  .get('/', async (req: Request, res: Response, next: NextFunction) => {

                        try {

                              let results: any = await invoiceController.select(req);

                              if (results.length)
                                    res.status(201).json(results[0]);
                              else
                                    throw new AppErrNotFound('Invoice NOT found!')

                        } catch (error) {
                              next(error);
                        }
                  })

                  //authorize only admin, manager to access rest of the routes
                  .use(auth.authorizeUserRoles([UserRole.admin, UserRole.manager]))

                  //create new invoice
                  .post('/', async (req: IRequestExtended, res: Response, next: NextFunction) => {

                        try {

                              let results: any = await invoiceController.create(req);
                              res.status(201).json({ Id: results.insertId, Message: 'Invoice Successfully Created' });

                        } catch (error) {
                              next(error);
                        }
                  })

                  //update invoice
                  .put('/', async (req: IRequestExtended, res: Response, next: NextFunction) => {

                        try {

                              let results: any = await invoiceController.update(req);
                              
                              //send sucess request
                              if (results.affectedRows)
                                    res.status(201).json({ Message: 'Invoice Successfully Updated!' });
                              else
                                    throw new AppErrNotFound('Invoice NOT found!');

                        } catch (error) {
                              next(error);
                        }
                  })

                  //update invoice status
                  .put('/:id/:status', async (req: IRequestExtended, res: Response, next: NextFunction) => {

                        try {

                              let results: any = await invoiceController.updateInvoiceStatus(req.params.id, req.params.status);

                              //send sucess request
                              if (results.affectedRows)
                                    res.status(201).json({ Message: 'Invoice Status Successfully Updated!' });
                              else
                                    throw new AppErrNotFound('Invoice NOT found!');

                        } catch (error) {
                              next(error);
                        }
                  })

                  //delete invoice
                  .delete('/:id', async (req: IRequestExtended, res: Response, next: NextFunction) => {

                        try {

                              let results: any = await invoiceController.delete(req.params.id);

                              //send sucess request
                              if (results.affectedRows)
                                    res.status(201).json({ Message: 'Invoice Successfully Deleted!' });
                              else
                                    return next(new AppErrNotFound('Invoice NOT found!'))

                        } catch (error) {
                              next(error);
                        }
                  })
      }
}

const invoiceRoutes = new InvoiceRoutes()
export default invoiceRoutes.router