import express from "express";
import dotenv from "dotenv";
import mongoose, { CallbackError } from "mongoose";
import { config } from "./src/services/config";
import { authRouter } from "./src/routers/auth";
import { profileRouter } from "./src/routers/profile";

const app = express();
dotenv.config();

// MIDDLEWARES
app.use(express.json());


// ROUTERS
app.use("/api/user/", authRouter);
app.use("/api/profile/", profileRouter);


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
