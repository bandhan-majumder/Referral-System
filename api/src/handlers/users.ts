import { NextFunction, Request, Response } from "express";
import { CreateUserDto } from "../dtos/CreateUser.dito";
import { PrismaClient } from "@prisma/client";
import { generateRandomReferrals } from "../generateReferrals";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { middlewareInterfaceRequest } from "../dtos/ReferralMiddleware";

const SECRET: string = "";

export async function signUpUsers(
  request: Request<{}, {}, CreateUserDto>,
  response: Response,
  next: NextFunction
) {
  const { username, password, referralCode } = request.body;
  // username must be of between length 5 to 10
  if (username.length < 5 || username.length > 10) {
    response.status(400).json({
      success: false,
      message: "username must be within 5 to 10 characters",
    });
    return
  } else {
    // connect the prisma client
    const client = new PrismaClient();

    try {
      // check if the referral code is valid or not
      if (referralCode) {
        const referralCodeExists = await client.users.findFirst({
          where: {
            referralCode: referralCode,
          },
          select: {
            id: true,
            username: true,
          },
        });
        if(!referralCodeExists){
          response.status(404).json({
            success: false,
            message: "Invalid REFERRAL code"
          })
          return
        }
      }

      // check if the given username already exists or not
      const userExists = await client.users.findFirst({
        where: {
          username: username,
        },
        select: {
          username: true,
          referralCode: true,
        },
      });

      if(userExists){
          response.status(400).json({
            success: false,
            message: "Username already exists!"
        })
        return
      } else { // if there is not previous user with the username
        // hash the password with salting
        const hashedPassword = await bcrypt.hash(password, 3);

        // generate random unique referralcode
        const userReferralCode = generateRandomReferrals(username);
        const respDB = await client.users.create({
          data: {
            username,
            password: hashedPassword,
            referralCode: userReferralCode,
          },
          select: {
            id: true,
            username: true,
            referralCode: true,
          },
        });

        // update referral db is the user has send referral code
        if (referralCode) {
          await client.referrals.create({
            data: {
              referralCode: referralCode,
              referredUserId: respDB.id,
            },
          });

          // update referral count by 1 of the code the new user used
          await client.users.update({
            where: {referralCode: referralCode},
            data: {
              referralCount : {
                increment: 1
              }
            }
          })
        }
        response.status(200).send({ ...respDB, success: true });
      } 
    } catch (error) {
      response.status(400).send({
        success: false,
        message: "Server side problem occured.",
      });
      return
    }
  }
}

export async function signInUsers(
  request: Request<{}, {}, CreateUserDto>,
  response: Response,
  next: NextFunction
) {
  const { username, password } = request.body;
  const client = new PrismaClient();
  const userExists = await client.users.findFirst({
    where: { username: username },
    select: {
      username: true,
      password: true,
      referralCode: true,
    },
  });
  // check if the user exists or not
  if (!userExists) {
    response.status(404).json({
      success: false,
      message: "User not found!",
    });
  } else {
    // check the password is valid or not
    const passCheck = await bcrypt.compare(password, userExists.password);
    if (!passCheck) {
      response.status(400).json({
        success: false,
        message: "Invalid password",
      });
    } else {
      // destructure without password to set as cookie
      const { password: pass, ...rest } = userExists;

      // set cookie
      const token: string = jwt.sign(
        {
          username: username,
          referralCode: userExists.referralCode,
        },
        SECRET
      );

      response
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest);
    }
  }
}

export async function logOutHelper(
  request: Request<{}, {}, middlewareInterfaceRequest>,
  response: Response,
  next: NextFunction
) {
  const { username, referralCode } = request.body;

  // if user is not logged in, ask them to login first
  if (!username || !referralCode) {
    response.status(403).json({
      success: false,
      message: "Log in first",
    });
  } else {
    response.clearCookie("access_token");
    response.status(200).json({ success: true, message: "Cookie deleted" });
  }
}
