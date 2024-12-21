import Joi from "joi";
import { BadRequestError } from "./error-models";

export class CredentialsModel {
    public email: string;
    public password: string;

    public constructor(credentials: CredentialsModel) {
        this.email = credentials.email;
        this.password = credentials.password;
    }

    // validation
    private static loginExcitingUser = Joi.object({
        email: Joi.string().required().min(2).max(100),
        password: Joi.string().required().min(5).max(100),
    });

    public validateLogin(): void {
        
        const result = CredentialsModel.loginExcitingUser.validate(this);
        if (result.error) throw new BadRequestError(result.error.message);
    }

}
