import { Router } from "express";
import { logOutHelper, signInUsers, signUpUsers } from "../handlers/users";
import { showDetailsMiddleware } from "../middleware/referral";
import { showDetails } from "../handlers/referral";
import { showTopReferralCounts } from "../handlers/referral";

const userRouter = Router();

userRouter.post('/signup', signUpUsers)
userRouter.post('/signin', signInUsers)
userRouter.post('/showDetails',showDetailsMiddleware, showDetails)
userRouter.get('/leaderboard', showTopReferralCounts)
userRouter.post('/logout', showDetailsMiddleware, logOutHelper)

export default userRouter;