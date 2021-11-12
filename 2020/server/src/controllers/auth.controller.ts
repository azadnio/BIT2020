import { NextFunction, Request, Response } from "express";
import * as jwt from 'jsonwebtoken'
import { UserRole } from "../global.enums";
import { IRequestExtended } from "../global.interfaces";
import { AppErrUnAuthorized } from "../modals/apperror.class";

const SECRETKEY = 'SECTRET'

class AuthController {

    //DEBUG route for genrate token
    public index(req: Request, res: Response, next: NextFunction) {

        let email = "admin@domaisdfn.com"
            , role = UserRole.admin
            , id = 2;

        //generate the token, includes user email, role, id
        let token = jwt.sign({ email, role, id }, SECRETKEY, { expiresIn: "12h" })
        res.send(token)
    }

    //authorize security token
    public authorize(req: IRequestExtended, res: Response, next: NextFunction) {

        //get the token from header
        const token: any = req.headers['x-access-token'] || req.headers['authorization']

        //has token
        if (token)
            //validate token
            jwt.verify(token.split(" ")[1], SECRETKEY, (err, decoded) => {
                
                //failed or allow only staff, manager, admin cann access the API
                if (err || ![UserRole.admin, UserRole.manager, UserRole.staff].includes(decoded.role))
                    next(new AppErrUnAuthorized())

                //valid token, set the decoded data into request object
                if (decoded) {
                    req.decoded = decoded
                    next()
                }
            })

        //token not provided
        else
            next(new AppErrUnAuthorized('Token not provided'))
    }

    //role accessibilty middleware
    public authorizeUserRoles(roles: UserRole[]) {

        return (req: IRequestExtended, res: Response, next: NextFunction) => {

            if (!roles.includes(req.decoded.role))
                return next(new AppErrUnAuthorized())

            next()
        }
    }
}

export const auth = new AuthController();