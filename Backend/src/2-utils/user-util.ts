import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../3-models/user-model";

class UserUtil {
    public getUserId(req: Request){
        const header = req.headers.authorization;
        const token = header?.substring(7);
        const payload = jwt.decode(token) as { user: UserModel };
        const user = payload.user;
        return user.id;
    }
}

export const userUtil = new UserUtil();