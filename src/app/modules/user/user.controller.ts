import { NextFunction, Request, Response } from "express";
import userServices from "./user.service";
import httpStatusCodes from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import responseSender from "../../utils/reponseSender";

/* eslint-disable @typescript-eslint/no-unused-vars */

const getAllUserController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await userServices.getAllUserService();

    responseSender(res, {
      success: true,
      statusCode: httpStatusCodes.OK,
      message: "All users are retrieved successfully!",
      data: result.data,
      meta: result.meta,
    });
  }
);

const createUserContrller = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await userServices.createUserService(req.body);

    // res
    //   .status(httpStatusCodes.CREATED)
    //   .json({ message: "User created successfully.", user });

    responseSender(res, {
      success: true,
      statusCode: httpStatusCodes.CREATED,
      message: "User created successfully!",
      data: user,
    });
  }
);

const userControllers = { getAllUserController, createUserContrller };

export default userControllers;
