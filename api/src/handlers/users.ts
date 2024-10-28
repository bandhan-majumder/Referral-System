import { NextFunction, Request, Response } from "express";
import { CreateUserDto } from "../dtos/CreateUser.dito";
import { PrismaClient } from "@prisma/client";
import { generateRandomReferrals } from "../generateReferrals";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
  } else {
    // hash the password with salting
    const hashedPassword = await bcrypt.hash(password, 3);

    // generate random unique referralcode
    const userReferralCode = generateRandomReferrals(username);

    // connect the prisma client
    const client = new PrismaClient();

    try {
      // if the user has given a VALIDE referral code, only then increase the referralCount of the refferer by 1
      if (referralCode) {
        try {
          await client.users.update({
            data: {
              referralCount: {
                increment: 1, // increase the count by 1
              },
            },
            where: {
              referralCode: referralCode,
            },
          });
        } catch (error) {
          console.log(error);
          response.json({
            msg: "Invalid REFERRAL code",
          });
        }
      }

      // create new user
      const respDB = await client.users.create({
        data: {
          username,
          password: hashedPassword,
          referralCode: userReferralCode,
        },
        select: {
          id: true,
          username: true,
          referralCode: true
        },
      });

      // if referralCode is valid and avl, update the referral table
      if (referralCode) {
        await client.referrals.create({
          data: {
            referralCode: referralCode,
            referredUserId: respDB.id,
          },
        });
      }
      response.status(200).send(respDB);
    } catch (error) {
      response.status(400).send({
        success: false,
        message: "Username already exists!",
      });
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
