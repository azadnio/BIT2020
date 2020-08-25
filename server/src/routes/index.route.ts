import RouterClass from "../modals/router.class"
import { indexController } from "../controllers/index.controller"

 class IndexRoutes extends RouterClass{

    constructor() {
        super()
        this.config()
    }

    config(): void {
        
        this.router.get('/', indexController.index)
        this.router.get('/ver', indexController.version)
    }
}

const indexRoutes =  new IndexRoutes()
export default indexRoutes.router