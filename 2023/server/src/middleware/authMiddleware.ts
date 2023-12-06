import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = (requiredRoles: string[] = []) => {
    return (req: any, res: Response, next: NextFunction): void => {
        const token = req.header('Authorization')?.split(' ')[1];

        if (!token) {
            res.status(401).json({ error: 'Access denied. No token provided.' });
            return;
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const userRoles: string[] = (decoded as any).roles;

            // Check if any of the required roles match with the user's roles
            const hasRequiredRole = requiredRoles.some((requiredRole) =>
                userRoles.includes(requiredRole)
            );

            if (!hasRequiredRole) {
                res.status(403).json({ error: 'Access denied. Insufficient privileges.' });
                return;
            }

            // Attach the decoded token payload to the request object
            req.userId = (decoded as any).userId;
            req.userRoles = userRoles;

            // Get the expiration time of the token
            const exp = (decoded as any).exp * 1000;
            const currentTime = new Date().getTime();

            // Check if the token is nearing expiration (within 5 minutes)
            if (exp - currentTime < 5 * 60 * 1000) {
                // Generate a new token with an extended expiration time
                const newToken = jwt.sign({ userId: req.userId, roles: userRoles }, process.env.JWT_SECRET, {
                    expiresIn: '1h',
                });

                // Attach the new token to the response header
                res.setHeader('Authorization', `Bearer ${newToken}`);
            }

            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ error: 'Invalid token.' });
        }
    };
};
