import { NextFunction, Request, Response } from "express";

class LoggerMiddleware {
    public consoleLogRequest(req: Request, res: Response, next: NextFunction): void {
        console.log("Method: " + req.method);
        console.log("Route: " + req.originalUrl);
        // , and not + because body it is object
        console.log("Body: ", req.baseUrl);
        next();
    }
}

export const loggerMiddleware = new LoggerMiddleware();

