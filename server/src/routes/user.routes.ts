import RouterClass from "../modals/router.class"
import { userController } from "../controllers/user.controller"


 class UserRoutes extends RouterClass{

    constructor() {
        super()
        this.config()
    }

    //configure user related routes
    config(): void {
        
        //user CRUD routes
        this.router
            .get('/', userController.index)
            .post('/', userController.create)
            .put('/', userController.update)
            .delete('/', userController.delete)
    }
}

const userRoutes =  new UserRoutes()
export default userRoutes.router