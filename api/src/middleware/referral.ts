import { NextFunction, Request, Response } from "express";
import { middlewareInterfaceRequest } from "../dtos/ReferralMiddleware";
import jwt from "jsonwebtoken";

// take this from .env
const SECRET: string = "";

interface MyJwtPayload {
    username: string,
    referralCode: string,
    iat: number
}

export async function showDetailsMiddleware(
    request: Request<{}, {}, middlewareInterfaceRequest>,
    response: Response,
    next: NextFunction
  ){
    const token:string = request.cookies.access_token;
    if(!token){

        response.status(400).json({
            "success": false,
            "message": "You are not logged in"
        })
    } else {
        try{
            const decoded = await jwt.verify(token, SECRET) as MyJwtPayload

            // set username and referralCode in the request
            request.body.username = decoded.username;
            request.body.referralCode = decoded.referralCode;
            next();
        } catch (error) {
            response.status(403).json({
                "success": false,
                "message": "Invalid token"
            });
        }

    }
  }