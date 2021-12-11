import { Router, Request, Response } from "express";
import { verifyToken } from "../middlewares/verifyToken";
import { UserModel } from "../models/User";

const profileRouter: Router = Router();
profileRouter.use(verifyToken);

profileRouter.get(
  "/me/",
  async (_: Request, res: Response): Promise<Response> => {
    const { id } = res?.locals?.meta;
    
    if (!id) {
      return res.status(404).send({
        status: "Error",
        message: "User not found",
      });
    }

    try {
      const me = await UserModel.findById(id);
      return res.status(200).send({
        status: "success",
        message: me,
      });
    } catch (err) {
      return res.status(404).send({
        status: "Error",
        message: "User not found",
      });
    }
  }
);

export { profileRouter };
