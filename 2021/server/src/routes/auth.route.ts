import RouterClass from "./router.class"
import { auth } from "../controllers/auth.controller"


class AuthRoutes extends RouterClass {

    constructor() {
        super()
        this.config()
    }

    //configure user related routes
    config(): void {

        //user CRUD routes
        this.router
            .get('/', auth.index)
            .post('/', auth.authorize)
            // .put('/', userController.update)
            // .delete('/', userController.delete)
    }
}

const authRoutes = new AuthRoutes()
export default authRoutes.router