import { NextFunction, Request, Response } from "express";
import { BadRequestError, ForbiddenError, UnauthorizedError } from "../3-models/error-models";
import { cyber } from "../2-utils/cyber";
import striptags from "striptags";

class SecurityMiddleware {

    public validateToken(request: Request, response: Response, next: NextFunction): void {
        const header = request.headers.authorization;

        // const token = header.split("Bearer ")[1]; // bad practice
        const token = header?.substring(7);

        if (!cyber.isTokenValid(token)) {
            next(new UnauthorizedError("You are not logged in"));
            return;
        }

        next();
    }

    public validateAdmin(request: Request, response: Response, next: NextFunction): void {
        const header = request.headers.authorization;

        // const token = header.split("Bearer ")[1]; // bad practice
        const token = header?.substring(7);

        if (!cyber.validateAdmin(token)) {
            next(new ForbiddenError("You are not authorized"));
            return;
        }
        next();
    }


    // xss - cross cite scripting
    public preventXssAttack(req: Request, res: Response, next: NextFunction): void {

        for (const prop in req.body) {
            const value = req.body[prop]
            if (typeof value === "string") {
                req.body[prop] = striptags(value);
            }
        }
        next(); 
    }


}

export const securityMiddleware = new SecurityMiddleware();