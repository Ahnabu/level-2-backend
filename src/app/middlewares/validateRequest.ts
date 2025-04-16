import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from "zod";

const validateRequest = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
         schema.parseAsync({
        body: req.body,
        
     });
    } catch (err){
        next(err)
    }
  

   return next();
}
export default validateRequest;