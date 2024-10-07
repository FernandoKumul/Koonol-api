import express from "express";
import dotenv from "dotenv"
import connectDB from "./config/db";
import userRouter from "./routes/userRoutes";
import rolRouter from "./routes/rolRoutes"
import tianguisRouter from "./routes/tianguisRoutes"
import scheduleTianguisRouter from "./routes/scheduleTianguisRoutes"
import locationSalesStallsRouter from "./routes/locationSalesStallsRoutes"
import assistanceRouter from "./routes/assistanceRoutes"
import salesStallsRouter from "./routes/salesStallsRoutes"
import sellerRouter from "./routes/sellersRoutes"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000;
app.use(express.json());

connectDB()

//Rutas
app.use('/api/users', userRouter)
app.use('/api/rol', rolRouter)
app.use('/api/tianguis', tianguisRouter);
app.use('/api/schedule-tianguis', scheduleTianguisRouter)
app.use('/api/location-sales-stalls', locationSalesStallsRouter)
app.use('/api/assistance', assistanceRouter)
app.use('/api/sales-stalls', salesStallsRouter)
app.use('/api/sellers', sellerRouter)


app.listen(PORT, () => {
  console.log(`Server running at PORT: ${PORT}`)
}).on("error", (error) => {
  throw new Error(error.message);
});
