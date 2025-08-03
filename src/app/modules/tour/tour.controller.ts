import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import responseSender from "../../utils/reponseSender";
import tourServices from "./tour.service";

// ------------------------------------------ Tour Controllers ------------------------------------------

const createTourController = catchAsync(
  async (req: Request, res: Response) => {

    const tour = await tourServices.createTourService(req.body)

    responseSender(res, {
      success: true,
      statusCode: 201,
      message: "Tour Created Successfully",
      data: tour
    })
  }
);

const getTourController = catchAsync(async (req: Request, res: Response) => {

  const result = await tourServices.getTourService(req.query);

  responseSender(res, {
      success: true,
      statusCode: 200,
      message: "Tour Retrieved Successfully",
      data: result.data,
      meta: result.meta
    })
});

const updateTourController = catchAsync(
  async (req: Request, res: Response) => {

    responseSender(res, {
      success: true,
      statusCode: 200,
      message: "Tour Updated Successfully",
      data: ""
    })
  }
);

const deleteTourController = catchAsync(
  async (req: Request, res: Response) => {

    responseSender(res, {
      success: true,
      statusCode: 204,
      message: "Tour Deleted Successfully",
      data: ""
    })
  }
);

// ------------------------------------------ TourType Controllers ------------------------------------------

const createTourTypeController = catchAsync(
  async (req: Request, res: Response) => {

    responseSender(res, {
      success: true,
      statusCode: 201,
      message: "TourType Created Successfully",
      data: ""
    })
  }
);

const getTourTypeController = catchAsync(
  async (req: Request, res: Response) => {

    responseSender(res, {
      success: true,
      statusCode: 200,
      message: "TourType Retrieved Successfully",
      data: ""
    })
  }
);

const updateTourTypeController = catchAsync(
  async (req: Request, res: Response) => {

    responseSender(res, {
      success: true,
      statusCode: 200,
      message: "TourType Updated Successfully",
      data: ""
    })
  }
);

const deleteTourTypeController = catchAsync(
  async (req: Request, res: Response) => {

    responseSender(res, {
      success: true,
      statusCode: 204,
      message: "TourType Deleted Successfully",
      data: ""
    })
  }
);

const tourControllers = {
  // tour control
  createTourController,
  getTourController,
  updateTourController,
  deleteTourController,

  // tour-type control
  createTourTypeController,
  getTourTypeController,
  updateTourTypeController,
  deleteTourTypeController,
};

export default tourControllers;
