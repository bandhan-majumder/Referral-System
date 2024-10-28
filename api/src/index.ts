import express, { NextFunction, Request, Response } from "express";
import userRouter from "./routes/users";
import cookieParser from "cookie-parser"

const app = express();

app.use(cookieParser());
app.use(express.json())

app.use('/api/users', userRouter);

const PORT = 3000;


app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
