import express from "express";
import userRouter from "./routes/users";
import cookieParser from "cookie-parser"
import path from "path";

const __dirname: string = path.resolve();
const app = express();

app.use(cookieParser());
app.use(express.json())

app.use('/api/users', userRouter);

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (request, response)=>{
  response.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'))
})

const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

export default app;