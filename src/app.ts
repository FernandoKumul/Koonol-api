import express from "express";
import dotenv from "dotenv"
import connectDB from "./config/db";
import userRouter from "./routes/userRoutes";
import rolRouter from "./routes/rolRoutes"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000;
app.use(express.json());

connectDB()

//Rutas
app.use('/api/users', userRouter)
app.use('/api/rol', rolRouter)

app.listen(PORT, () => {
  console.log(`Server running at PORT: ${PORT}`)
}).on("error", (error) => {
  throw new Error(error.message);
});
