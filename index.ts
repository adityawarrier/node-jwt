import express from "express";
import mongoose, { CallbackError } from "mongoose";
import { authRouter } from "./src/routers/auth";
import dotenv from "dotenv";
import { config } from "./src/services/config";

const app = express();
dotenv.config();

// MIDDLEWARES
app.use(express.json());


// ROUTERS
app.use("/api/user/", authRouter);


// DB
mongoose.connect(config().db.connection, (error: CallbackError) => {
  if (error) {
    console.error(error);
    return;
  }
  
  console.log("Connected to remote ATLAS DB");
});


// Start the server
app.listen(config().app.port, () => {
  console.log("listening on port 3000");
});
