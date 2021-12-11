import { Router, Request, Response } from "express";
import { UserModel } from "../models/User";

const authRouter: Router = Router();

authRouter.post("/register", async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const newUser = new UserModel({
    name,
    email,
    password,
  });

  try {
    const savedUser = await newUser.save();
    res.status(200).send(savedUser);
  } catch (err: any) {
    console.log(err);
    res.status(400).send({
      status: 'Error',
      message: err?.message ?? 'Unkown error occured!',
    });
  }
});

export { authRouter };
