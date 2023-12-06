import express from 'express';
import { UserController } from '../controllers/userController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();
const userController = new UserController();

router.post('/register', (req, res, next) => userController.registerUser(req, res, next));
router.post('/login', (req, res, next) => userController.loginUser(req, res, next));

router.get('/protected', authMiddleware(['admin']), (req : any, res) => {
    // Access the authenticated user's ID and roles from the request object
    const userId = req.userId;
    const userRoles = req.userRoles;
    res.status(200).json({ message: `Protected route accessed by user ID: ${userId}, roles: ${userRoles}` });
  });

export { router as userRoutes };
