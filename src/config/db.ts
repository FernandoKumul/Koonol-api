import mongoose from "mongoose";
 
export default function connectDB() {
  const url = process.env.MONGODB_URI

  if (!url) {
    console.error("MongoDB connection string missing!");
    process.exit(1);
  }
 
  try {
    mongoose.connect(url)
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error("An unknown error occurred");
    }
    process.exit(1);
  }

  //Avisa en consola si la conexión fue exitosa
  const dbConnection = mongoose.connection;
  dbConnection.once("open", (_) => {
    console.log(`Database connected: ${url}`);
  });
 
  //Avisa si hay un error después de establecer la conexión
  dbConnection.on("error", (err) => {
    console.error(`connection error: ${err}`);
  });
  
}