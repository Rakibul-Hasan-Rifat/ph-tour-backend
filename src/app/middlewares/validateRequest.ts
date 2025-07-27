import { NextFunction, Request, Response } from "express";
import { ZodObject } from "zod";

const validateRequest = (zodShema: ZodObject) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log('validate request');
        
        req.body = await zodShema.parseAsync(req.body);        
        console.log(req.body);
        
        next();
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        next(error);
    }
}

export default validateRequest;