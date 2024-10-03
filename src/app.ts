import express from "express";
import dotenv from "dotenv"

dotenv.config()
const app = express()

const PORT = process.env.PORT || 3000;


app.get('/', (req, res) => {
  res.send('Elmo sabe donde vives!')
  console.log('Hello World!')
})

app.listen(PORT, () => {
  console.log(`Server running at PORT: ${PORT}`)
}).on("error", (error) => {
  throw new Error(error.message);
});
