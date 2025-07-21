import { Response } from "express";

interface TMeta {
    total: number
}

interface TResponse<T> {
    success: boolean,
    statusCode: number,
    message: string,
    data: T,
    meta?: TMeta
}

const responseSender = <T>(res: Response, data: TResponse<T>) => {

    res.status(data.statusCode).json({
        statusCode: data.statusCode,
        success: data.success,
        message: data.message,
        data: data.data,
        meta: data.meta
    })
};

export default responseSender;