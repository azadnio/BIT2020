import { IRequestExtended } from './../global.interfaces';
import { UserRole } from './../global.enums';
import { auth } from './../controllers/auth.controller';
import { AppErrNotFound } from './../modals/apperror.class';
import { Request, Response, NextFunction } from 'express';
import RouterClass from "./router.class"
import { userController } from "../controllers/user.controller"


class UserRoutes extends RouterClass {

    constructor() {
        super()
        this.config()
    }

    //configure user related routes
    config(): void {

        //system_user CRUD routes
        this.router

            //select system_user
            .get('/', async (req: Request, res: Response, next: NextFunction) => {

                try {

                    let results: any = await userController.select(req);

                    if (results.length)
                        res.status(201).json(results[0]);
                    else
                        throw new AppErrNotFound('User NOT found!')

                } catch (error) {
                    next(error);
                }
            })

            //create new system_user
            .post('/', [auth.authorizeUserRoles([UserRole.admin])], async (req: IRequestExtended, res: Response, next: NextFunction) => {

                try {

                    let results: any = await userController.create(req);
                    res.status(201).json({ Id: results.insertId, Message: 'User Successfully Created' });

                } catch (error) {
                    next(error);
                }
            })

            //update system_user
            .put('/', [auth.authorizeUserRoles([UserRole.admin, UserRole.manager])], async (req: IRequestExtended, res: Response, next: NextFunction) => {

                try {

                    let results: any = await userController.update(req);

                    //send sucess request
                    if (results.affectedRows)
                        res.status(201).json({ Message: 'User Successfully Updated!' });
                    else
                        throw new AppErrNotFound('User NOT found!');

                } catch (error) {
                    next(error);
                }
            })

            //delete system_user
            .delete('/', [auth.authorizeUserRoles([UserRole.admin])], async (req: IRequestExtended, res: Response, next: NextFunction) => {

                try {

                    let results: any = await userController.delete(req);

                    //send sucess request
                    if (results.affectedRows)
                        res.status(201).json({ Message: 'User Successfully Deleted!' });
                    else
                        return next(new AppErrNotFound('User NOT found!'))

                } catch (error) {
                    next(error);
                }
            })
    }
}

const userRoutes = new UserRoutes()
export default userRoutes.router