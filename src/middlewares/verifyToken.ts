import { NextFunction, Request, Response } from "express";
import { AuthService, IToken } from "../services/auth";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  let token = req.headers.authorization;
  token = token?.split(" ")[1] ?? "";

  if (!token) {
    return res.status(401).send({
      status: "Error",
      message: "Access Denied",
    });
  }

  try {
    const isVerified: IToken = AuthService.verifyToken(token);
    if (!isVerified) {
      throw new Error();
    }

    // Save user details temporarily in the res object
    res.locals.meta = {
      id: isVerified.id,
      name: isVerified.name,
    };
    
    next();
  } catch (err: any) {
    console.error(err);
    return res.status(401).send({
      status: "Error",
      message: "Access Denied",
    });
  }
};

export { verifyToken };
