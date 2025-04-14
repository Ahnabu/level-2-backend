import { Response } from "express";


const sendResponse =<T> (res: Response, data: {
    success: boolean;
    message?: string;
    statusCode: number;
    data?: T;
    error?: T;
}) => {
    res.status(data.statusCode).json({
        success: data.success,
        message: data.message || null,
        data: data.data || null,
        error: data.error || null,
    });
}

export default sendResponse;