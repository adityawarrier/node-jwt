import { Router, Request, Response } from "express";
import { UserModel, UserValidator } from "../models/User";
import { extractValidatorErrorMessages } from "../services/validation";

const authRouter: Router = Router();

authRouter.post("/register", async (req: Request, res: Response) => {
  const [isError, error] = UserValidator(req.body);
  
  if(isError && !!error) {
    res.status(400).send(extractValidatorErrorMessages(error));
  }
  
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
