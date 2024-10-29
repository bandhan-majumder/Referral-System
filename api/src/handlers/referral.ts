import { NextFunction, Request, response, Response }from "express";
import { PrismaClient } from "@prisma/client";
import { middlewareInterfaceRequest } from "../dtos/ReferralMiddleware";

export async function showDetails(
  request: Request<{}, {}, middlewareInterfaceRequest>,
  response: Response,
  next: NextFunction
) {
    const {username, referralCode} = request.body;
    const client = new PrismaClient();

    try{
        const userInfo = await client.users.findFirst({
            where:{referralCode: referralCode},
            select:{
                id: true,
                referralCount: true
            }
        })
        console.log(response)
        response.status(200).json({
            "success": true,
            "referralCode": `${referralCode}`,
            "referralCount": `${userInfo?.referralCount}`,
            "message": `Your CODE ${referralCode} has ${userInfo?.referralCount} counts`
        })
    } catch(error){
        response.status(500).json({
            success: false,
            message: "Server Error"
        })
    }
    
}

export async function showTopReferralCounts(
    request: Request,
    response: Response,
    next: NextFunction) {
  console.log("coming here.......")
  const client = new PrismaClient();
  const topReferrers = await client.users.findMany({
    orderBy: {
      referralCount: 'desc'
    },
    take: 5, // take top 5 users
    select: {
      username: true,
      referralCode: true,
      referralCount: true
    }
  });
  console.log("reaching here")
  console.log(topReferrers)
  response.status(200).json({
    topReferrers
  })
}