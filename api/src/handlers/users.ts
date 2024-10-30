import { NextFunction, Request, Response } from "express";
import { CreateUserDto } from "../dtos/CreateUser.dito";
import { PrismaClient } from "@prisma/client";
import { generateRandomReferrals } from "../generateReferrals";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { middlewareInterfaceRequest } from "../dtos/ReferralMiddleware";
import { z } from "zod";

// add this in .env
const SECRET: string = "";

export async function signUpUsers(
  request: Request<{}, {}, CreateUserDto>,
  response: Response,
  next: NextFunction
) {
  const { username, password, referralCode } = request.body;

  // expected schema of password and username

  const rightSchema = z.object({
    username: z
      .string()
      .min(5, "username must be between 5 to 10 characters")
      .max(10, "username must be between 5 to 10 characters"),
    password: z
      .string()
      .min(8, "username must be at least 8 characters long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase character")
      .regex(/[a-z]/, "Password must contain atleast one lowercase character")
      .regex(/[0-9]/, "Password must contan atleast one number")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character"
      ),
    referralCode: z.string().optional(),
  });

  const safeParsed = await rightSchema.safeParse(request.body);

  if (!safeParsed.success) {
    response.status(403).json({
      success: false,
      message:
        "Invalid format. Username (5-8 chars) and password (8 chars: 1 upper, 1 lower, 1 number, 1 special)",
    });
    return;
  } else {
    // connect the prisma client
    const client = new PrismaClient();

    try {
      // check if the referral code is valid or not
      if (referralCode) {
        // check if the code is of 6 digits or not to reduce db calls
        if (referralCode.length === 6) {
          const referralCodeExists = await client.users.findFirst({
            where: {
              referralCode: referralCode,
            },
            select: {
              id: true,
              username: true,
            },
          });
          if (!referralCodeExists) {
            response.status(404).json({
              success: false,
              message: "Invalid REFERRAL code",
            });
            return;
          }
        } else {
          response.status(403).json({
            success: false,
            message: "REFERRAL code must be of 6 digits",
          });
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

      if (userExists) {
        response.status(400).json({
          success: false,
          message: "Username already exists!",
        });
        return;
      } else {
        // if there is not previous user with the username
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
            where: { referralCode: referralCode },
            data: {
              referralCount: {
                increment: 1,
              },
            },
          });
        }
        response.status(200).send({ ...respDB, success: true });
      }
    } catch (error) {
      response.status(400).send({
        success: false,
        message: "Server side problem occured.",
      });
      return;
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
