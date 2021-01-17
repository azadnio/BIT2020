import { auth } from '../controllers/auth.controller';
import { IRequestExtended } from '../global.interfaces';
import { UserRole } from '../global.enums';
import { AppErrNotFound } from '../modals/apperror.class';
import { Request, Response, NextFunction } from 'express';
import RouterClass from "./router.class"
import { orderController } from '../controllers/order.controller';

class OrderRoutes extends RouterClass {

      constructor() {
            super()
            this.config()
      }

      //configure user related routes
      config(): void {

            //order CRUD routes
            this.router

                  //select order
                  .get('/', async (req: Request, res: Response, next: NextFunction) => {

                        try {

                              let results: any = await orderController.select(req);

                              if (results.length)
                                    res.status(201).json(results[0]);
                              else
                                    throw new AppErrNotFound('Order NOT found!')

                        } catch (error) {
                              next(error);
                        }
                  })

                  //authorize only admin, manager to access rest of the routes
                  .use(auth.authorizeUserRoles([UserRole.admin, UserRole.manager]))

                  //create new order
                  .post('/', async (req: IRequestExtended, res: Response, next: NextFunction) => {

                        try {

                              let results: any = await orderController.create(req);
                              res.status(201).json({ Id: results.insertId, Message: 'Order Successfully Created' });

                        } catch (error) {
                              next(error);
                        }
                  })

                  //update order
                  .put('/', async (req: IRequestExtended, res: Response, next: NextFunction) => {

                        try {

                              let results: any = await orderController.update(req);
                              //send sucess request
                              if (results.affectedRows)
                                    res.status(201).json({ Message: 'Order Successfully Updated!' });
                              else
                                    throw new AppErrNotFound('Order NOT found!');

                        } catch (error) {
                              next(error);
                        }
                  })

                  //update order status
                  .put('/:id/:status', async (req: IRequestExtended, res: Response, next: NextFunction) => {

                        try {

                              let results: any = await orderController.updateOrderStatus(req.params.id, req.params.status);

                              //send sucess request
                              if (results.affectedRows)
                                    res.status(201).json({ Message: 'Order Status Successfully Updated!' });
                              else
                                    throw new AppErrNotFound('Order NOT found!');

                        } catch (error) {
                              next(error);
                        }
                  })

                  //delete order
                  .delete('/:id', async (req: IRequestExtended, res: Response, next: NextFunction) => {

                        try {

                              let results: any = await orderController.delete(req.params.id);

                              //send sucess request
                              if (results.affectedRows)
                                    res.status(201).json({ Message: 'Order Successfully Deleted!' });
                              else
                                    return next(new AppErrNotFound('Order NOT found!'))

                        } catch (error) {
                              next(error);
                        }
                  })
      }
}

const orderRoutes = new OrderRoutes()
export default orderRoutes.router