import { NextFunction, Request, Response } from "express";
import httpStatusCodes from 'http-status-codes';
import catchAsync from "../../utils/catchAsync";
import responseSender from "../../utils/reponseSender";
import divisionServices from "./division.service";

const createDivisionController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const result = await divisionServices.createDivisionService(req.body);

    responseSender(res, {
        success: true,
        statusCode: 201,
        message: "Division is created successfully!",
        data: result
    })
})

const getDivisionController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {

    const result = await divisionServices.getDivisionService();

    responseSender(res, {
        success: true,
        statusCode: 201,
        message: "Division is created successfully!",
        data: result.data,
        meta: result.meta
    })
  }
);

const updateDivisionController = catchAsync(
  async (req: Request, res: Response) => {

    const result = await divisionServices.updateDivisionService(req.params.id, req.body)

    responseSender(res, {
        success: true,
        statusCode: 203,
        message: "Division is updated successfully!",
        data: result
    })

  }
);

const deleteDivisionController = catchAsync(async (req: Request, res: Response) => {
    const result = divisionServices.deleteDivisionService(req.params.id)

    responseSender(res, {
        success: true, 
        statusCode: httpStatusCodes.NO_CONTENT,
        message: "Deletion is successful",
        data: result
    })
})

const divisionControllers = {
  createDivisionController,
  getDivisionController,
  updateDivisionController,
  deleteDivisionController
};

export default divisionControllers;
