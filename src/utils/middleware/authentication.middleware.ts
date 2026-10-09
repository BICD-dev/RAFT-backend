import { Request, Response, NextFunction, RequestHandler } from "express";
import JwtService from "../jwt/jwt.service";
import { UnauthorizedException } from "../exceptions/unauthorized.exception";

// extend the Request interface to include user property
declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                email: string;
            };
        }
    }
}

const jwtService = new JwtService();
interface JWTPayload {
    id: string;
    email: string;
}

export const authenticate: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new UnauthorizedException("Authorization header missing or malformed");
        }

        // extract token
        const token = authHeader.split(" ")[1];
        if (!token) {
            throw new UnauthorizedException("Token missing");
        }
        
        // verify token
        const decoded = jwtService.verify<JWTPayload>(token);
        if (!decoded || !decoded.id || !decoded.email) {
            throw new UnauthorizedException("Invalid token");
        }

        // attach user info to request object
        req.user = { 
            id: decoded.id,
            email: decoded.email 
        };
        next();
    } catch (error) {
        next(error);
    }
};