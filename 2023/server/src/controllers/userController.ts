import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserService } from '../services/userService';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  // Controller method for user registration
  registerUser(req: Request, res: Response, next: NextFunction): void {
    const { name, email, password, roles } = req.body;

    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        console.error(err);
        return next(new Error('Internal server error'));
      }

      const user = { name, email, password: hash, roles };

      this.userService.registerUser(user)
        .then(() => {
          res.status(201).json({ message: 'User registered successfully' });
        })
        .catch((error) => {
          console.error(error);
          return next(new Error('Internal server error'));
        });
    });
  }

  // Controller method for user login
  loginUser(req: Request, res: Response, next: NextFunction): void {
    const { email, password } = req.body;

    this.userService.getUserByEmail(email)
      .then((user) => {
        if (!user) {
          return res.status(401).json({ error: 'Authentication failed' });
        }

        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) {
            console.error(err);
            return next(new Error('Internal server error'));
          }

          if (isMatch) {
            const token = jwt.sign({ userId: user.id, roles: user.roles }, process.env.JWT_SECRET, {
              expiresIn: '1h',
            });

            return res.status(200).json({ token, roles: user.roles });
          }

          return res.status(401).json({ error: 'Authentication failed' });
        });
      })
      .catch((error) => {
        console.error(error);
        return next(new Error('Internal server error'));
      });
  }
}
