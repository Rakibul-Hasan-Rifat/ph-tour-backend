import { NextFunction, Request, Response } from "express";
import userServices from "./user.service";
import httpStatusCodes from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import responseSender from "../../utils/reponseSender";
import { JwtPayload } from "jsonwebtoken";

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
  async (req: Request, res: Response) => {
    const user = await userServices.createUserService(req.body);    

    responseSender(res, {
      success: true,
      statusCode: httpStatusCodes.CREATED,
      message: "User created successfully!",
      data: user,
    });
  }
);

const updateUserContrller = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {

    const user = await userServices.updateUserService(
      req.params.id,
      req.body,
      req.user as JwtPayload
    );

    responseSender(res, {
      success: true,
      statusCode: httpStatusCodes.ACCEPTED,
      message: "User updated successfully!",
      data: user,
    });
  }
);

const userControllers = {
  getAllUserController,
  createUserContrller,
  updateUserContrller,
};

export default userControllers;
