import express, { NextFunction, Request, Response } from "express";
import { fileSaver } from "uploaded-file-saver";
import { userUtil } from "../2-utils/user-util";
import { StatusCode } from "../3-models/enums";
import { VacationModel } from "../3-models/vacation-model";
import { vacationService } from "../4-services/vacation-service";
import { securityMiddleware } from "../6-middleware/security-middleware";

class VacationController {

    public readonly router = express.Router();

    public constructor() {

        this.router.get("/vacations-likes",securityMiddleware.validateToken, this.getVacationsWithLikes);
        this.router.get("/vacations/:vacationId(\\d+)", this.getOneVacation);

        this.router.post("/vacations", securityMiddleware.validateToken,securityMiddleware.validateAdmin, this.addVacation); 
        this.router.put("/vacations/:vacationId(\\d+)", securityMiddleware.validateToken, securityMiddleware.validateAdmin, this.updateVacation);
        this.router.delete("/vacations/:vacationId(\\d+)", securityMiddleware.validateToken, securityMiddleware.validateAdmin, this.deleteVacation);
        
        this.router.get("/vacations/images/:imageName", this.getImageFile); 
    }

    private async getOneVacation(request: Request, response: Response, next: NextFunction) {
        try {
            const vacationId = +request.params.vacationId
            const data = await vacationService.getOneVacation(vacationId);
            response.json(data);
        }
        catch (err: any) { next(err); }
    }

    private async getVacationsWithLikes(request: Request, response: Response, next: NextFunction) {
        try {
            const userId = userUtil.getUserId(request);
            const data = await vacationService.getVacationsWithLikes(userId);
            response.json(data);
        }
        catch (err: any) { next(err); }
    }

    private async addVacation(request: Request, response: Response, next: NextFunction) {
        try {
            request.body.img = request.files?.img;
            const vacation = new VacationModel(request.body);
            const dbVacation = await vacationService.addVacation(vacation);
            response.status(StatusCode.Created).json(dbVacation);
        } catch (err: any) {
            next(err);
        }
    }

    private async updateVacation(request: Request, response: Response, next: NextFunction) {
        try {
            request.body.id = +request.params.vacationId;
            request.body.img = request.files?.img;
            const vacation = new VacationModel(request.body);
            const dbVacation = await vacationService.updateVacation(vacation);
            response.json(dbVacation);
        } catch (err: any) {
            next(err);
        }
    }

    private async deleteVacation(request: Request, response: Response, next: NextFunction) {
        try {
            const vacationId = +request.params.vacationId
            await vacationService.deleteVacation(vacationId);
            response.sendStatus(StatusCode.NoContent)
        }
        catch (err: any) { next(err); }
    }

    private async getImageFile(request: Request, response: Response, next: NextFunction) {
        try {
            const imageName = request.params.imageName;
            const absolutePath = fileSaver.getFilePath(imageName);
            response.sendFile(absolutePath);
        } catch (err: any) {
            next(err);
        }
    }

}

export const vacationController = new VacationController();
