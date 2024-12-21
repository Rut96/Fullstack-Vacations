import Joi from "joi";
import { RoleModel } from "./role-model";
import { BadRequestError } from "./error-models";

export class UserModel {
    
    public id: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public roleId: RoleModel;
    
    public constructor(user: UserModel) { 
        this.id = user.id;
        this.firstName = user.firstName?.trim();
        this.lastName = user.lastName?.trim();
        this.email = user.email;
        this.password = user.password;
        this.roleId = user.roleId;
    }

    private static registerNewUser = Joi.object({
        id: Joi.number().forbidden(),
        firstName: Joi.string().required().min(2).max(100),
        lastName: Joi.string().required().min(2).max(100),
        email: Joi.string().required().min(2).max(100),
        password: Joi.string().required().min(5).max(100)
    });

    public validateRegister(): void {
        const result = UserModel.registerNewUser.validate(this);
        if (result.error) throw new BadRequestError(result.error.message);
    }

    private static updateValidationSchema = Joi.object({
        firstName: Joi.string().optional().min(2).max(100),
        lastName: Joi.string().optional().min(2).max(100),
        email: Joi.string().optional().min(2).max(100),
        password: Joi.string().optional().min(5).max(100)
    });

    public validateUpdate(): void {
        const result = UserModel.updateValidationSchema.validate(this);
        if (result.error) throw new BadRequestError(result.error.message);
    }
}
