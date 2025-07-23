import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import responseSender from "../../utils/reponseSender";
import httpStatusCodes from "http-status-codes";
import authServices from "./auth.service";

const credentialsLoginController = catchAsync(async (req:Request, res: Response) => {

    const loginInfo = await authServices.credentialsLoginService(req.body);

    responseSender(res, {
        success: true,
        statusCode: httpStatusCodes.OK,
        message: "User logged in successfully!",
        data: loginInfo
    })
})

const authControllers = {
    credentialsLoginController
}

export default authControllers;