import cors from "cors";
import express, { Express } from "express";
import { appConfig } from "./2-utils/app-config";
import { vacationController } from "./5-controllers/vacation-controller";
import { errorMiddleware } from "./6-middleware/error-middleware";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import fileUpload from "express-fileupload";
import path from "path";
import { fileSaver } from "uploaded-file-saver";
import { securityMiddleware } from "./6-middleware/security-middleware";
import { loggerMiddleware } from "./6-middleware/logger-middleware";
import { userController } from "./5-controllers/user-controller";
import https, { ServerOptions } from "https";
import fs from "fs";
import { likeController } from "./5-controllers/like-controller";

class App {

    public server: Express; // Make server public for the testing.

    public start(): void {

        // Create the server: 
        this.server = express();

        // prevent problematic response header:
        this.server.use(helmet({ crossOriginResourcePolicy: false }));

        this.server.use(cors()); // Enabling CORS for any frontend address.

        // Tell express to create a request.body object from the body json:
        this.server.use(express.json());

        // tell express to create req.files obj from files sent by the front
        this.server.use(fileUpload());

        // connect file saver:
        const absolutePath = path.join(__dirname, "1-assets", "images");
        fileSaver.config(absolutePath);

        // register custom middlewares
        this.server.use(loggerMiddleware.consoleLogRequest);
        this.server.use(securityMiddleware.preventXssAttack);

        // Connect controllers to the server:
        this.server.use("/api", userController.router, vacationController.router, likeController.router);

        // Register route not found middleware: 
        this.server.use("*", errorMiddleware.routeNotFound);

        // Register catch-all middleware: 
        this.server.use(errorMiddleware.catchAll);

        this.server.listen(appConfig.port, () => console.log("Listening on http://localhost:" + appConfig.port));

    }

}

export const app = new App(); // export app for the testing.
app.start();



