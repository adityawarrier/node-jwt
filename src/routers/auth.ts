import { Router, Request, Response } from "express";
import { AuthService } from "../services/auth";
import { schemaValidator } from "../services/validation";
import {
  userLoginSchemaValidator,
  UserModel,
  userSchemaValidator,
} from "../models/User";

const authRouter: Router = Router();

authRouter.post(
  "/register/",
  async (req: Request, res: Response): Promise<void> => {
    // Validate the request body
    const [isError, error] = schemaValidator(req.body, userSchemaValidator);

    if (isError && !!error) {
      res.status(400).send(error);

      return;
    }

    const { name, email, password } = req.body;

    // Check if the email already exists
    const existingUser = await UserModel.findOne({ email });
    if (!!existingUser) {
      res.status(400).send({
        status: "Error",
        message: `Email address ${existingUser.email} already exists`,
      });

      return;
    }

    // Create a new user
    const newUser = new UserModel({
      name,
      email,
      password: await AuthService.hashPassword(password),
    });

    try {
      const savedUser = await newUser.save();
      res.status(200).send(savedUser);
    } catch (err: any) {
      console.log(err);
      res.status(400).send({
        status: "Error",
        message: err?.message ?? "Unkown error occured!",
      });
    }
  }
);

authRouter.post(
  "/login/",
  async (req: Request, res: Response): Promise<void> => {
    // Validate the request body
    const [isError, error] = schemaValidator(
      req.body,
      userLoginSchemaValidator
    );

    if (isError && !!error) {
      res.status(400).send(error);

      return;
    }

    const { email, password } = req.body;

    // Check if the email already exists
    const existingUser = await UserModel.findOne({ email });
    if (!existingUser) {
      res.status(400).send({
        status: "Error",
        message: `Email address ${email} does not exist! Please register!`,
      });

      return;
    }

    // check if the password is valid
    const isPasswordValid = await AuthService.validatePassword(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      res.status(400).send({
        status: "Error",
        message: "Incorrect Password!",
      });

      return;
    }

    const token = AuthService.createToken({
      id: existingUser._id,
      name: existingUser.name,
    });
    
    res.status(200).send({
      status: "Success",
      message: "Logged in",
      token,
    });
  }
);

export { authRouter };
