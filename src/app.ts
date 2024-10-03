import express from "express";
import dotenv from "dotenv"
import connectDB from "./config/db";
import userRouter from "./routes/userRoutes";

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000;
app.use(express.json());

connectDB()

app.get('/', (req, res) => {
  res.send('Elmo sabe donde vives!')
  console.log('Hello World!')
})

//Rutas
app.use('/api/users', userRouter)

app.listen(PORT, () => {
  console.log(`Server running at PORT: ${PORT}`)
}).on("error", (error) => {
  throw new Error(error.message);
});
