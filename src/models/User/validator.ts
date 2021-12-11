import Joi from "joi";
import { IUser } from "./user";

const userValidatorSchema: Joi.ObjectSchema<IUser> = Joi.object<IUser>().keys({
  name: Joi.string().required().min(6).max(255),
  email: Joi.string().email().required(),
  password: Joi.string().email().required().min(6).max(255),
  dob: Joi.date().default(Date.now()),
});

export const UserValidator = (user: IUser): [boolean, Joi.ValidationError | null] => {
  const { error } = userValidatorSchema.validate(user, { abortEarly: false });

  if(error) {
    return [true, error];
  }

  return [false, null];
};