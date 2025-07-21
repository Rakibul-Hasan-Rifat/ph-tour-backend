import httpStatusCodes from 'http-status-codes';
import { Request, Response } from "express";

const notFoundError = (req: Request, res: Response) => {
  res.status(httpStatusCodes.NOT_FOUND).json({ success: false, message: "Route not found!" });
};

export default notFoundError;
