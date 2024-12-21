import { UploadedFile } from "express-fileupload";
import Joi from "joi";
import { BadRequestError } from "./error-models";

export class VacationModel {

    public id: number;
    public destination: string;
    public description: string;
    public startDate: Date;
    public endDate: Date;
    public price: number;
    public img: UploadedFile;
    public imgUrl: string;

    public constructor(vacation: VacationModel) { 
        this.id = vacation.id;
        this.destination = vacation.destination;
        this.description = vacation.description;
        this.startDate = vacation.startDate;
        this.endDate = vacation.endDate;
        this.price = vacation.price;
        this.img = vacation.img;
        this.imgUrl = vacation.imgUrl;
    }

    private static insertValidationSchema = Joi.object({
        id: Joi.number().forbidden(),
        destination: Joi.string().required().min(2).max(100),
        description: Joi.string().required().min(2).max(10000),
        startDate: Joi.date().required(),
        endDate: Joi.date().required(),
        price: Joi.number().required().min(0).max(10000),
        img: Joi.object().optional(),
        imgUrl: Joi.string().optional().max(200)
    });

    public validateInsert(): void {
        const result = VacationModel.insertValidationSchema.validate(this);
        if (result.error) throw new BadRequestError(result.error.message);
    }
    
    private static updateValidationSchema = Joi.object({
        id: Joi.number().required().integer().positive(),
        destination: Joi.string().optional().min(2).max(100),
        description: Joi.string().optional().min(2).max(10000),
        startDate: Joi.date().optional(),
        endDate: Joi.date().optional(),
        price: Joi.number().optional().min(0).max(10000),
        img: Joi.object().optional(),
        imgUrl: Joi.string().optional().max(200)
    });

    public validateUpdate(): void {
        const result = VacationModel.updateValidationSchema.validate(this);
        if (result.error) throw new BadRequestError(result.error.message);
    }
}