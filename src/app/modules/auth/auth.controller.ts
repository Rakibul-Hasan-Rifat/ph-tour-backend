import type { IUser } from './../user/user.interface';
import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import responseSender from "../../utils/reponseSender";
import httpStatusCodes from "http-status-codes";
import authServices from "./auth.service";
import { setAuthCookie } from "../../utils/setCookie";
import AppError from "../../errors/app.error";
import createUserToken from "../../utils/userTokens";
import environmentVariables from "../../config/env.config";
import { JwtPayload } from "jsonwebtoken";
import passport from "passport";

const credentialsLoginController = catchAsync(
  async (req: Request, res: Response) => {
    const loginInfo = await authServices.credentialsLoginService(req.body);

    setAuthCookie(res, loginInfo);

    responseSender(res, {
      success: true,
      statusCode: httpStatusCodes.OK,
      message: "User logged in successfully!",
      data: loginInfo,
    });
  }
);

const getNewAccessTokenController = catchAsync(
  async (req: Request, res: Response) => {
    
    const refreshToken = req.cookies.refreshToken;
    const tokenInfo = await authServices.getNewAccessTokenService(refreshToken);

    setAuthCookie(res, tokenInfo);

    responseSender(res, {
      success: true,
      statusCode: httpStatusCodes.OK,
      message: "New access token is built automatically for the user!",
      data: tokenInfo,
    });
  }
);


const logoutController = catchAsync(
  async (req: Request, res: Response) => {
    
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: false,
      sameSite: "lax"
    })

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: false,
      sameSite: "lax"
    })

    responseSender(res, {
      success: true,
      statusCode: httpStatusCodes.OK,
      message: "User logged out",
      data: null,
    });
  }
);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const resetPasswordController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

  const {oldPassword, newPassword} = req.body;

  await authServices.resetPasswordService(oldPassword, newPassword, req.user as JwtPayload)

  responseSender(res, {
    success: true,
    statusCode: httpStatusCodes.ACCEPTED,
    message: "Reset password is successful.", 
    data: null,
  })
})

const googleCallbackControler = catchAsync(async (req: Request, res: Response) => {

  const user = req.user;

  // eslint-disable-next-line no-console
  console.log(user);
  

  if(!user) {
    throw new AppError(httpStatusCodes.NOT_FOUND, "User Not Found")
  }

const tokenInfo = createUserToken(user)

setAuthCookie(res, tokenInfo)

res.redirect(`${environmentVariables.FRONTEND_URL}`) 

})

const googleLocalLoginController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // passport.authenticate("local", (err: any, user: any, info: any, status: any) => {
    
  //   if(err) {
  //     return next(new AppError(401, err));
  //   }

  //   if(!user) {
  //     return next(new AppError(401, "User not found!"))
  //   }

  //   const userTokens = createUserToken(user);

  //   setAuthCookie(res, userTokens);

  //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //   const {password, ...rest} = user.toObject();

  //   responseSender(res, {
  //     success: true,
  //     statusCode: 200,
  //     message: "User logged in successfully by passport-local!",
  //     data: {
  //       accessToken: userTokens.accessToken, refreshToken: userTokens.refreshToken, user: rest
  //     }
  //   })

  // })(req, res, next)

  const user = req.user;

  if (!user) {
      return next(new AppError(401, "User not found!"))
  }

      const userTokens = createUserToken(user);

    setAuthCookie(res, userTokens);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {password, ...rest} = user.toObject() as IUser;

    responseSender(res, {
      success: true,
      statusCode: 200,
      message: "User logged in successfully by passport-local without authenticate!",
      data: {
        accessToken: userTokens.accessToken, refreshToken: userTokens.refreshToken, user: rest
      }
    })
})

const authControllers = {
  logoutController,
  googleCallbackControler,
  resetPasswordController,
  credentialsLoginController,
  googleLocalLoginController,
  getNewAccessTokenController,
};

export default authControllers;
