import cors from "cors";
import passport from "passport";
import cookieParser from "cookie-parser";
import expressSession from "express-session";
import express, { Application, Request, Response } from "express";

import "./app/config/passport.config"
import router from "./app/routes/index";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFoundError from "./app/middlewares/notFoundError";

const app: Application = express();

app.use(cors());
app.use(expressSession({
  secret: "My Secret",
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Welcome the ph-tour-management again." });
});

// global error handler
app.use(globalErrorHandler);

// not-found error handler
app.use(notFoundError);

export default app;
