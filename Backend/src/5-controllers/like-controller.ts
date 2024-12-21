import express, { NextFunction, Request, Response } from "express";
import { likeService } from "../4-services/like-serivce";
import { userUtil } from "../2-utils/user-util";
import { securityMiddleware } from "../6-middleware/security-middleware";

class LikeController {
    public readonly router = express.Router();

    public constructor() {
        this.router.post("/likes/:vacationId(\\d+)", securityMiddleware.validateToken, this.addLike);
        this.router.delete("/likes/:vacationId(\\d+)", securityMiddleware.validateToken, this.removeLike);
    }

    private async addLike(request: Request, response: Response, next: NextFunction) {
        try {
            const userId = userUtil.getUserId(request);
            const vacationId = +request.params.vacationId;
            const data = await likeService.addLike(userId, vacationId);
            response.json(data);
        }
        catch (err: any) { next(err); }
    }

    private async removeLike(request: Request, response: Response, next: NextFunction) {
        try {
            const userId = userUtil.getUserId(request);
            const vacationId = +request.params.vacationId;
            const data = await likeService.removeLike(userId, vacationId);
            response.json(data);
        }
        catch (err: any) { next(err); }
    }


}

export const likeController = new LikeController();