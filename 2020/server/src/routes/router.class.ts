import { Router } from "express"

abstract class RouterClass {

    public router: Router = Router()

    constructor() {

    }

    abstract config():void
}

export default RouterClass