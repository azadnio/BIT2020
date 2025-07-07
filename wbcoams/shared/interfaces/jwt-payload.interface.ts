import { UserRole } from "../enums/user-roles.enum";

// Interface for JWT payload
export interface JwtPayload {
    id: number; // User or customer ID
    role: UserRole;
    email: string;
    userId?: number; // If the payload is for a customer, this will be the user ID
}