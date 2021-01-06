import * as express from "express";
import { Application, NextFunction, Response, Request } from 'express'
import indexRoute from './routes/index.route'
import { AppError } from './modals/apperror.class'
import invoiceRoutes from './routes/invoice.route'
import { indexController } from './controllers/index.controller'

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
        this.app.use('/api/invoice', invoiceRoutes)

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

                console.log(err.stack)
            }

            res.status(status).send({ status, message })
        });
    }

    start(): void {

        //listen the port
        this.app.listen(this.app.get('port'), () => {
            console.log('Server running on PORT', this.app.get('port'))



                // setTimeout(() => {
                //     indexController.test();

                //     setTimeout(() => {
                //         indexController.test()
                //     }, 5000);

                // }, 1500);
        })
    }
}

//bootstrap
const server = new Server()
server.start()