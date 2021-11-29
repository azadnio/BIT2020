import { IInsertionDBResults, IRequestExtended } from './../global.interfaces';
import { auth } from './../controllers/auth.controller';
import { AppErrNotFound } from './../modals/apperror.class';
import { NextFunction, Response, Request } from 'express';
import { customerController } from './../controllers/customer.controller';
import RouterClass from "./router.class"
import { UserRole } from '../global.enums';

class CustomerRoutes extends RouterClass {

      constructor() {
            super()
            this.config()
      }

      //configure customer related routes
      config(): void {

            //customer CRUD routes
            this.router

                  //select customer
                  .get('/', async (req: Request, res: Response, next: NextFunction) => {

                        try {

                              let results: any = await customerController.select(req);

                              if (results.length)
                                    res.status(201).json(results[0]);
                              else
                                    throw new AppErrNotFound('Customer NOT found!')

                        } catch (error) {
                              next(error);
                        }
                  })

                  //authorize only admin, manager to access rest of the routes
                  .use(auth.authorizeUserRoles([UserRole.admin, UserRole.manager]))

                  //create new customer
                  .post('/', async (req: IRequestExtended, res: Response, next: NextFunction) => {

                        try {

                              let results = <IInsertionDBResults> await customerController.create(req);
                              res.status(201).json({ Id: results.insertId, Message: 'Customer Successfully Created' });

                        } catch (error) {
                              next(error);
                        }
                  })

                  //update customer
                  .put('/', async (req: IRequestExtended, res: Response, next: NextFunction) => {

                        try {

                              let results = <IInsertionDBResults> await customerController.update(req);

                              //send sucess request
                              if (results.affectedRows)
                                    res.status(201).json({ Message: 'Customer Successfully Updated!' });
                              else
                                    throw new AppErrNotFound('Customer NOT found!');

                        } catch (error) {
                              next(error);
                        }
                  })

                  //delete customer
                  .delete('/', async (req: IRequestExtended, res: Response, next: NextFunction) => {

                        try {

                              let results = <IInsertionDBResults> await customerController.delete(req);

                              //send sucess request
                              if (results.affectedRows)
                                    res.status(201).json({ Message: 'Customer Successfully Deleted!' });
                              else
                                    return next(new AppErrNotFound('Customer NOT found!'))

                        } catch (error) {
                              next(error);
                        }
                  })
      }
}

const customerRoutes = new CustomerRoutes()
export default customerRoutes.router