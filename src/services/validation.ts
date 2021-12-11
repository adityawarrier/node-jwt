import Joi from "joi";

const extractValidatorErrorMessages = (
  error: Joi.ValidationError
): { status: string; message: string[] } => {
  const { details } = error;

  return {
    status: "Error",
    message: details.map((det: Joi.ValidationErrorItem) => det.message),
  };
};

const schemaValidator = <T>(
  object: T,
  schema: Joi.ObjectSchema<T>
): [boolean, Joi.ValidationError | null] => {
  const { error } = schema.validate(object, { abortEarly: false });

  if (error) {
    return [true, error];
  }

  return [false, null];
};

export { extractValidatorErrorMessages, schemaValidator };
