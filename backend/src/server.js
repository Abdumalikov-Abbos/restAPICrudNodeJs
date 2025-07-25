// import express from 'express'
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDb } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import path from "path";
dotenv.config();
const app = express();
const PORT = 5001 || process.env.PORT;
const __dirname = path.resolve();

if(process.env.NODE_ENV === "production"){
  
  app.use(
    cors({
      origin: "http://localhost:5173",
    }),
  );
}
app.use(express.json()); //this middleware will parse JSON bodies: Req.body
app.use(rateLimiter);
// app.use((req, res, next) =>{
//     console.log(`Req method is ${req.method} Req url is ${req.url}`);
//     next();
// })

app.use("/api/notes", notesRoutes);

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, "../frontend/dist"))); 

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
})
}
connectDb().then(() => {
  app.listen(PORT, () => console.log("Listening on port 5001"));
});
