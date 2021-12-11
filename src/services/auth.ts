import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "./config";

interface IToken {
  id: string;
  name: string;
}

class AuthService {
  public hashPassword = async (password: string): Promise<string> => {
    const salt = await bcryptjs.genSalt();
    const hashedPassword = await bcryptjs.hash(password, salt);

    return hashedPassword;
  };

  public validatePassword = (
    resPassword: string,
    modelPassword: string
  ): Promise<boolean> => {
    return bcryptjs.compare(resPassword, modelPassword);
  };

  public createToken = (data: IToken): string => {
    return jwt.sign(data, config().token.secret);
  };

  public verifyToken = (token: string): IToken => {
    return jwt.verify(token, config().token.secret) as IToken;
  };
}

const AS = new AuthService();
export { AS as AuthService, IToken };
