/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express';

const notFound = ( req: Request, res: Response, next: NextFunction) => {
 
    res.status(404).json({
      success: false,
      message: 'Not Found',
    });
}
  
export default notFound;