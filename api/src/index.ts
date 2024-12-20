import express, { response } from "express";
import userRouter from "./routes/users";
import cookieParser from "cookie-parser"
import cors from 'cors';

const app = express();

app.use(cookieParser());
app.use(express.json())
app.use(cors())

app.use('/api/users', userRouter);

app.get('/',(request,response)=>{
 response.json({
  "status": "healthy"
 })
})

const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

export default app;