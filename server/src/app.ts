
import * as express from "express";
import { Application, NextFunction, Response, Request } from 'express'
import indexRoute from './routes/index.route'
import { AppError } from './modals/apperror.class'
import invoiceRoutes from './routes/invoice.route'
import { indexController } from './controllers/index.controller'
import customerRoutes from './routes/customer.routes';
import  authRoutes  from './routes/auth.route'
import { auth } from "./controllers/auth.controller";
import userRoutes from './routes/user.routes'

class Server {

    public app: Application

    constructor() {

        this.app = express()
        this.config()
        this.routes()
    }

    config(): void {

        //set app configuration variables
        this.app.set('port', process.env.PORT || 8080)

        //set application middlewares

        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: false }))
    }

    //appication routes
    routes(): void {

        this.app.use('/api/', indexRoute)
        this.app.use('/api/auth', authRoutes)

        //authorization middleware
        this.app.use(auth.authorize)
        
        this.app.use('/api/invoice', invoiceRoutes)
        this.app.use('/api/customer', customerRoutes);
        this.app.use('/api/user', userRoutes);

        //handle the errors
        this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {

            let status = 500
            let message = 'Something went wrong!'

            //defined exceptions
            if (err instanceof AppError) {

                status = err.status
                message = err.message
            }

            //not defined exceptions log the stack
            else {

                console.log('UNHANDLED ERROR')
                console.log(err.stack)
            }

            res.status(status).send({ status, message })
        });
    }

    start(): void {

        //listen the port
        this.app.listen(this.app.get('port'), () => {

            console.log('Server running on PORT', this.app.get('port'))
        })
    }
}

//bootstrap
const server = new Server()
server.start()