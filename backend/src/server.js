// import express from 'express'
import express from "express";
import cors from "cors"
import dotenv from "dotenv";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDb } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
dotenv.config();
const app = express();

app.use(cors({
  origin: "http://localhost:5173"
}))
app.use(express.json()); //this middleware will parse JSON bodies: Req.body
app.use(rateLimiter);
// app.use((req, res, next) =>{
//     console.log(`Req method is ${req.method} Req url is ${req.url}`);
//     next();
// })

app.use("/api/notes", notesRoutes);

const PORT = 5001 || process.env.PORT;
connectDb().then(() => {
  app.listen(PORT, () => console.log("Listening on port 5001"));
});
