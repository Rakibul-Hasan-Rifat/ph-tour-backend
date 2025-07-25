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

const tokenInfo = createUserToken(user as Express.User)

setAuthCookie(res, tokenInfo)

res.redirect(`${environmentVariables.FRONTEND_URL}`) 

})

const authControllers = {
  logoutController,
  googleCallbackControler,
  resetPasswordController,
  credentialsLoginController,
  getNewAccessTokenController,
};

export default authControllers;
