import { UserModel } from "../3-models/user-model";
import jwt, { SignOptions } from "jsonwebtoken";
import { appConfig } from "./app-config";
import { RoleModel } from "../3-models/role-model";
import crypto from "crypto";
import { Request } from "express-serve-static-core";

class Cyber {


    public hash(plainText: string): string {

        if (!plainText) return null;

        // sha - secure hashing algorithm
        //hashing without salt
        // return crypto.createHash("sha512").update(plainText).digest("hex"); // hex = convert binary to string

        //hashing with salt
        // hmac = hash based msg auth code
        return crypto.createHmac("sha512", appConfig.hashSalt).update(plainText).digest("hex"); // hex = convert binary to string

    }

    public getNewToken(user: UserModel): string {

        //remove password:
        delete user.password;

        // create payload to save inside the token
        const payload = { user };

        // create options:
        const options: SignOptions = { expiresIn: "3h" };

        // create (access) token
        const token = jwt.sign(payload, appConfig.jwtSecret, options);

        return token;
    }

    public isTokenValid(token: string): boolean {
        try {
            if (!token) return false;
            jwt.verify(token, appConfig.jwtSecret);
            return true;
        } catch (err: any) { return false; }
    }

    public validateAdmin(token: string): boolean {
        const payload = jwt.decode(token) as { user: UserModel };
        const user = payload.user;
        return user.roleId === RoleModel.Admin;
    }

}

export const cyber = new Cyber();