import Joi from "joi";
import { Model, model, Schema } from "mongoose";

interface IUser {
  name: string;
  email: string;
  password: string;
  dob?: Date;
}

const userSchemaValidator: Joi.ObjectSchema<IUser> = Joi.object<IUser>().keys({
  name: Joi.string().required().min(6).max(255),
  email: Joi.string().email().required(),
  password: Joi.string().email().required().min(6).max(255),
  dob: Joi.date().default(Date.now()),
});

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 1024,
  },
  dob: {
    type: Date,
    default: Date.now,
  },
});

const UserModel: Model<IUser> = model<IUser>("User", UserSchema);

export { UserModel, IUser, userSchemaValidator };
