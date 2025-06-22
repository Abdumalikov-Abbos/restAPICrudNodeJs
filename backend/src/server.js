// import express from 'express'
import express from "express";
import notesRoutes from "./routes/notesRoutes.js";

const app = express();

app.use("/api/notes", notesRoutes);

const port = 5001 || process.env.PORT;
app.listen(port, () => console.log("Listening on port 5001"));
