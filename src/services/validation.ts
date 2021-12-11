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

export { extractValidatorErrorMessages };
