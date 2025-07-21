import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./app/routes/index";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFoundError from "./app/middlewares/notFoundError";

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Welcome the ph-tour-management again." });
});

// global error handler
app.use(globalErrorHandler);

// not-found error handler
app.use(notFoundError);

export default app;
