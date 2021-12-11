import Joi from "joi";

interface IValidationError {
  status: string;
  message: string[];
}

const extractValidatorErrorMessages = (
  error: Joi.ValidationError
): IValidationError => {
  const { details } = error;

  return {
    status: "Error",
    message: details.map((det: Joi.ValidationErrorItem) => det.message),
  };
};

const schemaValidator = <T>(
  object: T,
  schema: Joi.ObjectSchema<T>
): [boolean, IValidationError | null] => {
  const { error } = schema.validate(object, { abortEarly: false });

  if (error) {
    return [true, extractValidatorErrorMessages(error)];
  }

  return [false, null];
};

export { extractValidatorErrorMessages, schemaValidator };
